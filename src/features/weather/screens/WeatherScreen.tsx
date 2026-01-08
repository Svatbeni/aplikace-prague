import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../shared/theme';
import { spacing } from '../../../shared/theme/spacing';
import { fetchWeatherData, getCachedWeather, shouldUpdateWeather } from '../../../shared/services/weatherService';
import { Weather, ForecastDay, WeatherCondition } from '../../../types';
import { format } from 'date-fns';

interface WeatherScreenProps {
  navigation: any;
}

const getWeatherIcon = (condition: WeatherCondition, iconCode?: string): string => {
  if (iconCode) {
    // Use OpenWeatherMap icon codes
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Fallback icons based on condition
  switch (condition) {
    case WeatherCondition.SUNNY:
      return '☀️';
    case WeatherCondition.PARTLY_CLOUDY:
      return '⛅';
    case WeatherCondition.CLOUDY:
      return '☁️';
    case WeatherCondition.RAIN:
      return '🌧️';
    case WeatherCondition.SNOW:
      return '❄️';
    case WeatherCondition.STORM:
      return '⛈️';
    default:
      return '☁️';
  }
};

const getWeatherGradient = (condition: WeatherCondition): string[] => {
  switch (condition) {
    case WeatherCondition.SUNNY:
      return ['#FFD700', '#FFA500'];
    case WeatherCondition.PARTLY_CLOUDY:
      return ['#87CEEB', '#B0C4DE'];
    case WeatherCondition.CLOUDY:
      return ['#708090', '#778899'];
    case WeatherCondition.RAIN:
      return ['#4682B4', '#5F9EA0'];
    case WeatherCondition.SNOW:
      return ['#E0E0E0', '#B0B0B0'];
    case WeatherCondition.STORM:
      return ['#2F4F4F', '#1C1C1C'];
    default:
      return ['#87CEEB', '#4682B4'];
  }
};

const getDayName = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  return format(date, 'EEEE');
};

export const WeatherScreen: React.FC<WeatherScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async (forceUpdate = false) => {
    try {
      if (forceUpdate) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const needsUpdate = await shouldUpdateWeather();
      let weatherData: Weather | null = null;

      if (forceUpdate || needsUpdate) {
        try {
          weatherData = await fetchWeatherData();
          setIsOffline(false);
          setError(null);
        } catch (error: any) {
          console.error('Failed to fetch weather:', error);
          setIsOffline(true);
          // Check if it's an API key error
          if (error?.response?.status === 401) {
            setError('Invalid API key. Please check your OpenWeatherMap API key configuration.');
          } else {
            setError('Unable to fetch weather data. Showing cached data if available.');
          }
          // Try to get cached data
          weatherData = await getCachedWeather();
        }
      } else {
        // Use cached data if it's fresh
        weatherData = await getCachedWeather();
        if (!weatherData) {
          // If no cache, try to fetch
          try {
            weatherData = await fetchWeatherData();
            setError(null);
          } catch (error: any) {
            if (error?.response?.status === 401) {
              setError('Invalid API key. Please check your OpenWeatherMap API key configuration.');
            }
          }
        }
      }

      setWeather(weatherData);
    } catch (error: any) {
      console.error('Error loading weather:', error);
      const cached = await getCachedWeather();
      setWeather(cached);
      setIsOffline(true);
      if (error?.response?.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API key configuration.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
    
    // Set up hourly updates
    const interval = setInterval(() => {
      loadWeather(true);
    }, 60 * 60 * 1000); // Every hour

    return () => clearInterval(interval);
  }, [loadWeather]);

  const onRefresh = useCallback(() => {
    loadWeather(true);
  }, [loadWeather]);

  if (loading && !weather) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Loading weather...
          </Text>
        </View>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline" size={64} color={theme.colors.textTertiary} />
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Unable to load weather data
          </Text>
          <Text style={[styles.errorSubtext, { color: theme.colors.textSecondary }]}>
            Please check your internet connection
          </Text>
        </View>
      </View>
    );
  }

  const gradientColors = getWeatherGradient(weather.current.condition);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Current Weather Card */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.currentWeatherCard}
        >
          <View style={styles.currentWeatherHeader}>
            <View>
              <Text style={styles.locationText}>{weather.location}</Text>
              <Text style={styles.dateText}>
                {format(weather.lastUpdated, 'EEEE, MMMM d, yyyy')}
              </Text>
            </View>
            {isOffline && (
              <View style={styles.offlineBadge}>
                <Ionicons name="cloud-offline" size={16} color="#FFFFFF" />
                <Text style={styles.offlineText}>Offline</Text>
              </View>
            )}
          </View>

          <View style={styles.currentWeatherContent}>
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperatureText}>{weather.current.temperature}°</Text>
              <View style={styles.conditionContainer}>
                {weather.current.icon ? (
                  <Image
                    source={{ uri: getWeatherIcon(weather.current.condition, weather.current.icon) }}
                    style={styles.weatherIcon}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.emojiIcon}>{getWeatherIcon(weather.current.condition)}</Text>
                )}
                <Text style={styles.conditionText}>
                  {weather.current.description.charAt(0).toUpperCase() +
                    weather.current.description.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Ionicons name="water" size={20} color="#FFFFFF" />
                <Text style={styles.detailText}>{weather.current.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="leaf" size={20} color="#FFFFFF" />
                <Text style={styles.detailText}>{weather.current.windSpeed} km/h</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Forecast Section */}
        <View style={styles.forecastSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            7-Day Forecast
          </Text>

          {weather.forecast.map((day: ForecastDay, index: number) => (
            <View
              key={index}
              style={[
                styles.forecastItem,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.forecastDayInfo}>
                <Text style={[styles.forecastDayName, { color: theme.colors.text }]}>
                  {getDayName(day.date)}
                </Text>
                <Text style={[styles.forecastDate, { color: theme.colors.textSecondary }]}>
                  {format(day.date, 'MMM d')}
                </Text>
              </View>

              <View style={styles.forecastMiddle}>
                {day.icon ? (
                  <Image
                    source={{ uri: getWeatherIcon(day.condition, day.icon) }}
                    style={styles.forecastIcon}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.forecastEmoji}>{getWeatherIcon(day.condition)}</Text>
                )}
                <Text
                  style={[styles.forecastDescription, { color: theme.colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {day.description}
                </Text>
              </View>

              <View style={styles.forecastTemps}>
                {day.precipitation !== undefined && (
                  <View style={styles.precipitationContainer}>
                    <Ionicons name="rainy" size={16} color={theme.colors.primary} />
                    <Text style={[styles.precipitationText, { color: theme.colors.textSecondary }]}>
                      {day.precipitation}%
                    </Text>
                  </View>
                )}
                <View style={styles.tempRange}>
                  <Text style={[styles.tempHigh, { color: theme.colors.text }]}>
                    {day.high}°
                  </Text>
                  <Text style={[styles.tempLow, { color: theme.colors.textSecondary }]}>
                    {day.low}°
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Error Message */}
        {error && (
          <View style={[styles.errorBanner, { backgroundColor: theme.colors.error + '20', borderColor: theme.colors.error }]}>
            <Ionicons name="warning" size={20} color={theme.colors.error} />
            <Text style={[styles.errorBannerText, { color: theme.colors.error }]}>
              {error}
            </Text>
          </View>
        )}

        {/* Last Updated Info */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textTertiary }]}>
            Last updated: {format(weather.lastUpdated, 'HH:mm')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  currentWeatherCard: {
    margin: spacing.md,
    borderRadius: 24,
    padding: spacing.xl,
    minHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  currentWeatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    gap: spacing.xs,
  },
  offlineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  currentWeatherContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  temperatureContainer: {
    marginBottom: spacing.lg,
  },
  temperatureText: {
    fontSize: 96,
    fontWeight: '300',
    color: '#FFFFFF',
    lineHeight: 100,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  weatherIcon: {
    width: 64,
    height: 64,
    marginRight: spacing.sm,
  },
  emojiIcon: {
    fontSize: 48,
    marginRight: spacing.sm,
  },
  conditionText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  forecastSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  forecastDayInfo: {
    width: 100,
  },
  forecastDayName: {
    fontSize: 16,
    fontWeight: '600',
  },
  forecastDate: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  forecastMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.md,
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
  forecastEmoji: {
    fontSize: 32,
  },
  forecastDescription: {
    fontSize: 14,
    flex: 1,
  },
  forecastTemps: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  precipitationText: {
    fontSize: 12,
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tempHigh: {
    fontSize: 18,
    fontWeight: '600',
  },
  tempLow: {
    fontSize: 16,
    opacity: 0.7,
  },
  footer: {
    padding: spacing.md,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing.sm,
  },
  errorBannerText: {
    fontSize: 14,
    flex: 1,
  },
});
