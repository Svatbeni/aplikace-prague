# Discovering Prague

A production-ready cross-platform mobile application for tourists visiting Prague. Built with React Native and Expo.

## 🚀 Features

- **Places to Visit**: Explore categorized places (sightseeing, hidden gems, food, nature, viewpoints)
- **Interactive Map**: View all places on an offline-capable map with category filters
- **Itineraries**: Predefined routes for different trip durations and themes (coming soon)
- **Organized Tours**: Affiliate links to tours via GetYourGuide (coming soon)
- **Practical Tips**: Offline-accessible travel information (coming soon)
- **Hotels**: Recommended areas with Booking.com affiliate links (coming soon)
- **Weather**: Current weather and 5-day forecast (coming soon)
- **Favorites**: Save places and itineraries for offline access

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation
- **Database**: Expo SQLite (offline-first)
- **Maps**: react-native-maps

### Project Structure
```
src/
├── features/          # Feature-based modules
│   ├── places/       # Places feature
│   ├── map/          # Map feature
│   └── ...
├── shared/           # Shared resources
│   ├── components/   # Reusable UI components
│   ├── services/     # Business logic services
│   ├── repositories/ # Data access layer
│   ├── stores/       # State management
│   ├── theme/        # Design system
│   └── utils/        # Helper functions
├── navigation/       # Navigation setup
└── types/           # TypeScript definitions
```

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS/Android:
```bash
npm run ios
# or
npm run android
```

## 🗄️ Database

The app uses SQLite for offline storage. The database is automatically initialized on first launch and seeded with sample data.

### Initial Data
- 8 sample places (Charles Bridge, Prague Castle, etc.)
- Categories: Sightseeing, Hidden Gems, Food, Nature, Viewpoints

## 🎨 Design System

The app follows Apple/Google Human Interface Guidelines with:
- Light and dark mode support
- Consistent spacing and typography
- Category-based color coding
- Accessibility considerations

## 🔮 Monetization (Prepared)

The architecture is ready for:
- **Ads**: AdMob integration (can be toggled via feature flags)
- **In-App Purchases**: Premium features (itineraries, maps)
- **Affiliate Links**: GetYourGuide tours, Booking.com hotels

Currently, all features are free. Monetization can be enabled remotely.

## 📱 Current Implementation Status

### ✅ Completed
- Project setup and configuration
- Database schema and repositories
- Theme system (light/dark mode)
- Navigation structure
- Places list screen with category filtering
- Place detail screen
- Interactive map with markers
- Favorites functionality
- Offline storage

### 🚧 Coming Soon
- Itineraries feature
- Tours screen
- Practical tips screen
- Hotels screen
- Weather screen
- More sample data
- Offline map tiles
- Image loading optimization

## 🛠️ Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📝 Documentation

- [Tech Stack](TECH_STACK.md) - Technology choices and justification
- [Architecture](ARCHITECTURE.md) - System architecture and design patterns
- [Data Models](DATA_MODELS.md) - Entity definitions and database schema
- [UI Design](UI_DESIGN.md) - Design system and UI principles
- [Implementation Plan](IMPLEMENTATION_PLAN.md) - Development roadmap

## 🔒 License

Private project - All rights reserved

