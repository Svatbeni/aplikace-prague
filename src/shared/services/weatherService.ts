import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from './database';
import { Weather, CurrentWeather, ForecastDay, WeatherCondition } from '../../types';
import { format } from 'date-fns';

const WEATHER_CACHE_KEY = 'weather_data';
const WEATHER_CACHE_TIMESTAMP_KEY = 'weather_cache_timestamp';
const PRAGUE_LAT = 50.0755;
const PRAGUE_LON = 14.4378;
const PRAGUE_NAME = 'Prague, Czech Republic';

// OpenWeatherMap API - using free tier
// Note: In production, you should store this in environment variables
// Get your free API key at: https://openweathermap.org/api
const API_KEY = 'a39c921daee49903211bffd2822f54cd'; // User needs to add their own API key
const API_URL = 'https://api.openweathermap.org/data/2.5';

// Map OpenWeatherMap condition codes to our WeatherCondition enum
const mapWeatherCondition = (code: number, icon: string): WeatherCondition => {
  // Clear sky
  if (code === 800) return WeatherCondition.SUNNY;
  // Partly cloudy
  if (code === 801 || code === 802) return WeatherCondition.PARTLY_CLOUDY;
  // Cloudy
  if (code === 803 || code === 804) return WeatherCondition.CLOUDY;
  // Storm (thunderstorm)
  if (code >= 200 && code < 300) return WeatherCondition.STORM;
  // Rain
  if (code >= 300 && code < 600) return WeatherCondition.RAIN;
  // Snow
  if (code >= 600 && code < 700) return WeatherCondition.SNOW;
  
  // Default based on icon
  if (icon.includes('01d') || icon.includes('01n')) return WeatherCondition.SUNNY;
  if (icon.includes('02')) return WeatherCondition.PARTLY_CLOUDY;
  if (icon.includes('03') || icon.includes('04')) return WeatherCondition.CLOUDY;
  if (icon.includes('09') || icon.includes('10')) return WeatherCondition.RAIN;
  if (icon.includes('11')) return WeatherCondition.STORM;
  if (icon.includes('13')) return WeatherCondition.SNOW;
  
  return WeatherCondition.CLOUDY;
};

export interface WeatherApiResponse {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    pop?: number; // probability of precipitation
  }>;
}

export const fetchWeatherData = async (): Promise<Weather | null> => {
  try {
    // Fetch current weather
    const currentResponse = await axios.get(`${API_URL}/weather`, {
      params: {
        lat: PRAGUE_LAT,
        lon: PRAGUE_LON,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Fetch 5-day/3-hour forecast (free tier)
    // Note: cnt parameter is deprecated, API returns 40 items (5 days) by default
    const forecastResponse = await axios.get(`${API_URL}/forecast`, {
      params: {
        lat: PRAGUE_LAT,
        lon: PRAGUE_LON,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const current = currentResponse.data;
    const forecastList = forecastResponse.data.list;

    // Process current weather
    const currentWeather: CurrentWeather = {
      temperature: Math.round(current.main.temp),
      condition: mapWeatherCondition(current.weather[0].id, current.weather[0].icon),
      description: current.weather[0].description,
      humidity: current.main.humidity,
      windSpeed: Math.round((current.wind?.speed || 0) * 3.6), // Convert m/s to km/h
      icon: current.weather[0].icon,
    };

    // Group forecast by day and calculate daily highs/lows
    const forecastByDay = new Map<string, {
      date: Date;
      temps: number[];
      conditions: Array<{ id: number; icon: string; description: string }>;
      precipitations: number[];
    }>();

    forecastList.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!forecastByDay.has(dayKey)) {
        forecastByDay.set(dayKey, {
          date,
          temps: [],
          conditions: [],
          precipitations: [],
        });
      }

      const dayData = forecastByDay.get(dayKey)!;
      dayData.temps.push(item.main.temp);
      dayData.conditions.push({
        id: item.weather[0].id,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      });
      if (item.pop !== undefined) {
        dayData.precipitations.push(item.pop);
      }
    });

    // Convert to ForecastDay array (7 days)
    const forecast: ForecastDay[] = Array.from(forecastByDay.values())
      .slice(0, 7)
      .map((dayData) => {
        const high = Math.round(Math.max(...dayData.temps));
        const low = Math.round(Math.min(...dayData.temps));
        // Use the most common condition or the one at noon
        const mainCondition = dayData.conditions[Math.floor(dayData.conditions.length / 2)];
        const avgPrecipitation = dayData.precipitations.length > 0
          ? Math.round((dayData.precipitations.reduce((a, b) => a + b, 0) / dayData.precipitations.length) * 100)
          : undefined;

        return {
          date: dayData.date,
          high,
          low,
          condition: mapWeatherCondition(mainCondition.id, mainCondition.icon),
          description: mainCondition.description,
          icon: mainCondition.icon,
          precipitation: avgPrecipitation,
        };
      });

    const weather: Weather = {
      location: PRAGUE_NAME,
      current: currentWeather,
      forecast,
      lastUpdated: new Date(),
    };

    // Cache the data
    await cacheWeatherData(weather);

    return weather;
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    
    // Log more details about the error
    if (error.response) {
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
      
      if (error.response.status === 401) {
        console.error('Invalid API key. Please check your OpenWeatherMap API key.');
        console.error('Make sure your API key is activated (can take up to 2 hours after creation).');
      }
    }
    
    // Return cached data if available
    return await getCachedWeather();
  }
};

const cacheWeatherData = async (weather: Weather): Promise<void> => {
  try {
    const dataString = JSON.stringify(weather);
    await AsyncStorage.setItem(WEATHER_CACHE_KEY, dataString);
    await AsyncStorage.setItem(WEATHER_CACHE_TIMESTAMP_KEY, new Date().toISOString());
    
    // Also cache in database
    const db = getDatabase();
    await db.runAsync(
      `INSERT OR REPLACE INTO weather_cache (id, location, data, last_updated) VALUES (?, ?, ?, ?)`,
      ['current', weather.location, dataString, weather.lastUpdated.toISOString()]
    );
  } catch (error) {
    console.error('Error caching weather data:', error);
  }
};

export const getCachedWeather = async (): Promise<Weather | null> => {
  try {
    // Try AsyncStorage first
    const cachedData = await AsyncStorage.getItem(WEATHER_CACHE_KEY);
    if (cachedData) {
      const weather: Weather = JSON.parse(cachedData);
      // Convert date strings back to Date objects
      weather.lastUpdated = new Date(weather.lastUpdated);
      weather.forecast = weather.forecast.map((day) => ({
        ...day,
        date: new Date(day.date),
      }));
      return weather;
    }

    // Fallback to database
    const db = getDatabase();
    const result = await db.getFirstAsync<{ data: string; last_updated: string }>(
      `SELECT data, last_updated FROM weather_cache WHERE id = ?`,
      ['current']
    );

    if (result) {
      const weather: Weather = JSON.parse(result.data);
      weather.lastUpdated = new Date(weather.lastUpdated);
      weather.forecast = weather.forecast.map((day) => ({
        ...day,
        date: new Date(day.date),
      }));
      return weather;
    }

    return null;
  } catch (error) {
    console.error('Error getting cached weather data:', error);
    return null;
  }
};

export const shouldUpdateWeather = async (): Promise<boolean> => {
  try {
    const timestamp = await AsyncStorage.getItem(WEATHER_CACHE_TIMESTAMP_KEY);
    if (!timestamp) return true;

    const lastUpdate = new Date(timestamp);
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

    // Update if more than 1 hour has passed
    return hoursSinceUpdate >= 1;
  } catch (error) {
    return true;
  }
};
