# Weather Feature Setup

## API Key Configuration

The weather feature uses OpenWeatherMap API to fetch real-time weather data for Prague.

### Getting an API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key (free tier allows 60 calls/minute)

### Setting the API Key

1. Open `src/shared/services/weatherService.ts`
2. Replace `YOUR_API_KEY_HERE` with your actual API key:

```typescript
const API_KEY = 'your-actual-api-key-here';
```

**Note:** In production, you should store the API key in environment variables or a secure configuration file, not directly in the code.

## Features

- **Current Weather**: Displays current temperature, condition, humidity, and wind speed
- **7-Day Forecast**: Shows daily high/low temperatures and conditions
- **Auto-Update**: Automatically refreshes every hour
- **Offline Support**: Shows last cached forecast when offline
- **Beautiful UI**: Gradient backgrounds based on weather conditions

## Offline Behavior

When the device is offline:
- The app displays the last successfully loaded forecast
- An "Offline" badge appears on the weather card
- Users can pull to refresh when connection is restored

## Cache

Weather data is cached in:
- AsyncStorage (for quick access)
- SQLite database (for persistence)

Data is automatically updated when:
- More than 1 hour has passed since last update
- User manually refreshes (pull to refresh)
- App automatically checks every hour
