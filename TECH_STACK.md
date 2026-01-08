# Tech Stack Proposal: Discovering Prague

## Framework: React Native with Expo

### Justification

**React Native + Expo** is chosen for the following reasons:

1. **Cross-platform efficiency**: Single codebase for iOS and Android
2. **Offline maps**: Excellent support via `react-native-maps` with offline tile caching
3. **Offline storage**: Multiple options (SQLite via `expo-sqlite`, AsyncStorage, Realm)
4. **Monetization ready**: Native support for ads (AdMob via `expo-ads-admob`) and IAP (`expo-in-app-purchases`)
5. **Development experience**: Hot reload, easy builds, over-the-air updates via EAS
6. **Ecosystem**: Rich library ecosystem, active community
7. **Future-proof**: Can eject to bare React Native if needed for advanced native features
8. **State management**: Flexible options (Zustand, Redux, Context API)

### Alternative Considered: Flutter
- Excellent performance and UI consistency
- Strong offline map support
- However: Smaller ecosystem for affiliate link handling, slightly steeper learning curve

---

## Core Dependencies

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator

### Maps & Location
- `react-native-maps` - Map component with offline support
- `expo-location` - Location services
- `react-native-offline-maps` or custom tile caching solution

### State Management
- `zustand` - Lightweight, simple state management (or Context API for smaller scale)
- Alternative: Redux Toolkit if complexity grows

### Offline Storage
- `expo-sqlite` - Local SQLite database for structured data
- `@react-native-async-storage/async-storage` - Key-value storage for simple data
- `expo-file-system` - File storage for offline maps/assets

### Data Fetching & Sync
- `axios` - HTTP client for online data
- Custom sync service for offline-first architecture

### UI & Styling
- `react-native-paper` or `native-base` - Component library (optional)
- `styled-components` or StyleSheet - Styling approach
- `expo-linear-gradient` - Gradients
- `react-native-vector-icons` / `@expo/vector-icons` - Icons

### Monetization (Prepared)
- `expo-ads-admob` - AdMob integration (can be disabled via feature flag)
- `expo-in-app-purchases` - IAP support
- Remote config ready for feature toggles

### Utilities
- `date-fns` - Date formatting
- `react-i18next` - Internationalization (EN first, expandable)
- `react-native-safe-area-context` - Safe area handling
- `expo-haptics` - Haptic feedback
- `expo-linking` - Deep linking for affiliate links

### Development
- `typescript` - Type safety
- `eslint` - Linting
- `prettier` - Code formatting

---

## Architecture Approach

### Offline-First Strategy

1. **Initial Load**: App ships with embedded SQLite database containing all places, itineraries, tips
2. **Sync Service**: Background sync for updates (weather, new content, featured tours)
3. **Caching**: 
   - Maps: Pre-downloaded tile bundles or dynamic caching
   - Images: Cached locally, lazy-loaded
4. **Graceful Degradation**: Online features (weather, tours) show "offline" state when unavailable

### Data Flow

```
User Action → Component → Service Layer → Storage Layer (SQLite/AsyncStorage)
                                ↓
                         API Sync Service (when online)
```

### Feature Flags

Remote config structure prepared for:
- Ads enabled/disabled
- IAP enabled/disabled
- Premium features locked/unlocked
- Feature rollouts

