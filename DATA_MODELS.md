# Data Models

## Core Entities

### Place
```typescript
interface Place {
  id: string                    // UUID
  name: string                  // "Charles Bridge"
  shortDescription: string      // Brief overview
  description: string           // Full description
  practicalTips: string         // Practical information
  category: PlaceCategory       // sightseeing, hidden_gems, food, nature, viewpoints
  latitude: number              // 50.0865
  longitude: number             // 14.4110
  openingHours?: OpeningHours   // Optional, if applicable
  images: string[]              // Array of image URIs/keys
  address?: string              // Optional address string
  estimatedVisitDuration?: number // Minutes
  priceRange?: PriceRange       // free, low, medium, high
  isPremium?: boolean           // Premium content flag
  createdAt: Date
  updatedAt: Date
}

enum PlaceCategory {
  SIGHTSEEING = 'sightseeing',
  HIDDEN_GEMS = 'hidden_gems',
  FOOD = 'food',
  NATURE = 'nature',
  VIEWPOINTS = 'viewpoints'
}

interface OpeningHours {
  monday?: DaySchedule
  tuesday?: DaySchedule
  wednesday?: DaySchedule
  thursday?: DaySchedule
  friday?: DaySchedule
  saturday?: DaySchedule
  sunday?: DaySchedule
  notes?: string                // "Closed on holidays"
}

interface DaySchedule {
  open: string                  // "09:00"
  close: string                 // "18:00"
  isClosed?: boolean
}
```

### Itinerary
```typescript
interface Itinerary {
  id: string                    // UUID
  title: string                 // "3 Days in Prague"
  description: string
  type: ItineraryType           // one_day, two_days, three_days, thematic
  theme?: ItineraryTheme        // first_time, couples, hidden_gems, etc.
  places: ItineraryPlace[]      // Ordered list
  estimatedDuration: number     // Total hours
  walkingDistance?: number      // Kilometers
  transportHints?: string[]     // ["Take tram 22 to..."]
  difficulty?: Difficulty       // easy, moderate, challenging
  isPremium?: boolean
  isFavorite?: boolean          // User preference
  createdAt: Date
  updatedAt: Date
}

enum ItineraryType {
  ONE_DAY = 'one_day',
  TWO_DAYS = 'two_days',
  THREE_DAYS = 'three_days',
  THEMATIC = 'thematic'
}

enum ItineraryTheme {
  FIRST_TIME = 'first_time',
  COUPLES = 'couples',
  HIDDEN_GEMS = 'hidden_gems',
  FOODIE = 'foodie',
  CULTURE = 'culture'
}

interface ItineraryPlace {
  placeId: string               // Reference to Place.id
  order: number                 // Order in itinerary (1, 2, 3...)
  estimatedDuration: number     // Minutes at this place
  transportTime?: number        // Minutes to next place
  transportMode?: TransportMode // walking, tram, metro, bus
  notes?: string                // "Best visited in morning"
}

enum TransportMode {
  WALKING = 'walking',
  TRAM = 'tram',
  METRO = 'metro',
  BUS = 'bus'
}

enum Difficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  CHALLENGING = 'challenging'
}
```

### Tour
```typescript
interface Tour {
  id: string
  title: string                 // "Prague Castle Tour"
  shortDescription: string
  description: string
  duration: string              // "3 hours" or "Half day"
  priceRange: string            // "€25-40" or "From €30"
  affiliateLink: string         // GetYourGuide URL
  provider?: string             // "GetYourGuide"
  category?: TourCategory       // walking, bus, boat, food
  rating?: number               // 1-5 (if available)
  imageUrl?: string
  requiresOnline: boolean       // true - online only
  createdAt: Date
  updatedAt: Date
}
```

### PracticalTip
```typescript
interface PracticalTip {
  id: string
  category: TipCategory
  title: string
  content: string               // Can contain markdown
  icon?: string                 // Icon name
  priority: number              // Display order
  updatedAt: Date
}

enum TipCategory {
  TRANSPORT = 'transport',
  MONEY = 'money',
  SAFETY = 'safety',
  EMERGENCY = 'emergency',
  TIPPING = 'tipping',
  INTERNET = 'internet',
  GENERAL = 'general'
}
```

### Hotel
```typescript
interface Hotel {
  id: string
  name: string
  area: string                  // "Old Town", "Prague 1", etc.
  description: string
  priceRange: string            // "€50-100/night"
  affiliateLink: string         // Booking.com URL
  imageUrl?: string
  rating?: number               // 1-5
  features?: string[]           // ["WiFi", "Breakfast", "Historic"]
}
```

### Weather
```typescript
interface Weather {
  location: string              // "Prague"
  current: CurrentWeather
  forecast: ForecastDay[]
  lastUpdated: Date
}

interface CurrentWeather {
  temperature: number           // Celsius
  condition: WeatherCondition   // sunny, cloudy, rain, etc.
  description: string           // "Partly cloudy"
  humidity: number              // Percentage
  windSpeed: number             // km/h
  icon: string                  // Weather icon code
}

interface ForecastDay {
  date: Date
  high: number                  // Max temperature
  low: number                   // Min temperature
  condition: WeatherCondition
  description: string
  icon: string
  precipitation?: number        // Percentage
}

enum WeatherCondition {
  SUNNY = 'sunny',
  PARTLY_CLOUDY = 'partly_cloudy',
  CLOUDY = 'cloudy',
  RAIN = 'rain',
  SNOW = 'snow',
  STORM = 'storm'
}
```

### Favorite
```typescript
interface Favorite {
  id: string
  userId?: string               // Optional, for multi-user future
  itemType: FavoriteType        // place, itinerary
  itemId: string                // Place.id or Itinerary.id
  createdAt: Date
}

enum FavoriteType {
  PLACE = 'place',
  ITINERARY = 'itinerary'
}
```

### AppSettings
```typescript
interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string              // 'en', 'cs', etc.
  offlineMapsDownloaded: boolean
  lastSyncDate?: Date
  adsEnabled: boolean           // User preference override
  notificationEnabled: boolean
}
```

## Database Schema (SQLite)

### Tables

```sql
-- Places
CREATE TABLE places (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  practical_tips TEXT,
  category TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  opening_hours TEXT,           -- JSON string
  images TEXT,                  -- JSON array string
  address TEXT,
  estimated_visit_duration INTEGER,
  price_range TEXT,
  is_premium INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_premium ON places(is_premium);

-- Itineraries
CREATE TABLE itineraries (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  theme TEXT,
  places TEXT NOT NULL,         -- JSON array of ItineraryPlace
  estimated_duration INTEGER,
  walking_distance REAL,
  transport_hints TEXT,         -- JSON array
  difficulty TEXT,
  is_premium INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_itineraries_type ON itineraries(type);
CREATE INDEX idx_itineraries_theme ON itineraries(theme);

-- Tours (online content)
CREATE TABLE tours (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  duration TEXT,
  price_range TEXT,
  affiliate_link TEXT NOT NULL,
  provider TEXT,
  category TEXT,
  rating REAL,
  image_url TEXT,
  requires_online INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Practical Tips
CREATE TABLE tips (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  icon TEXT,
  priority INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_tips_category ON tips(category);

-- Hotels
CREATE TABLE hotels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  description TEXT,
  price_range TEXT,
  affiliate_link TEXT NOT NULL,
  image_url TEXT,
  rating REAL,
  features TEXT,                -- JSON array
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Favorites
CREATE TABLE favorites (
  id TEXT PRIMARY KEY,
  item_type TEXT NOT NULL,      -- 'place' or 'itinerary'
  item_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE(item_type, item_id)
);

CREATE INDEX idx_favorites_type_id ON favorites(item_type, item_id);

-- Weather Cache
CREATE TABLE weather_cache (
  id TEXT PRIMARY KEY,
  location TEXT NOT NULL,
  data TEXT NOT NULL,           -- JSON string
  last_updated TEXT NOT NULL
);
```

