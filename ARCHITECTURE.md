# Application Architecture

## Architecture Diagram (Text-Based)

```
┌─────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Screens  │  │Components│  │ Navigation│ │   Theme  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  State   │  │ Services │  │  Hooks   │  │   Utils  │   │
│  │(Zustand) │  │  Layer   │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                        DOMAIN LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Models  │  │ Repositories│ │  Sync   │  │ Validators│  │
│  │          │  │            │ │  Service │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                         DATA LAYER                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  SQLite  │  │AsyncStore│  │File System│  │  API     │   │
│  │ Database │  │          │  │           │  │  Client  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Presentation Layer
- **Screens**: Full-screen UI components (PlaceListScreen, PlaceDetailScreen, etc.)
- **Components**: Reusable UI components (PlaceCard, ItineraryCard, MapMarker, etc.)
- **Navigation**: React Navigation setup and routes
- **Theme**: Colors, typography, spacing, dark mode

### 2. Application Layer
- **State Management**: Global app state (Zustand stores)
- **Services**: Business logic services (PlaceService, ItineraryService, etc.)
- **Hooks**: Custom React hooks for data fetching, state management
- **Utils**: Helper functions, formatters, validators

### 3. Domain Layer
- **Models**: TypeScript interfaces/types for entities
- **Repositories**: Data access abstractions (PlaceRepository, ItineraryRepository)
- **Sync Service**: Handles offline/online sync logic
- **Validators**: Data validation logic

### 4. Data Layer
- **SQLite**: Primary offline database for structured data
- **AsyncStorage**: Key-value storage for settings, favorites
- **File System**: Offline map tiles, cached images
- **API Client**: HTTP requests for sync, weather, tours

## Module Structure

### Features (Feature-Based Organization)
```
features/
  places/
    - screens/
    - components/
    - services/
    - hooks/
    - types.ts
    
  itineraries/
    - screens/
    - components/
    - services/
    - hooks/
    - types.ts
    
  map/
    - screens/
    - components/
    - services/
    - hooks/
    - types.ts
    
  tours/
    - screens/
    - components/
    - services/
    - hooks/
    - types.ts
    
  tips/
    - screens/
    - components/
    - types.ts
    
  hotels/
    - screens/
    - components/
    - types.ts
    
  weather/
    - screens/
    - components/
    - services/
    - hooks/
    - types.ts
    
  favorites/
    - screens/
    - services/
    - hooks/
    - types.ts
```

### Shared Resources
```
shared/
  - components/     (Button, Card, Input, etc.)
  - hooks/          (useOffline, useLocation, etc.)
  - services/       (SyncService, ApiClient, etc.)
  - repositories/   (Database, Repository implementations)
  - utils/          (formatters, validators, helpers)
  - types/          (common types)
  - constants/      (app constants, categories, etc.)
  - theme/          (colors, typography, spacing)
  - config/         (feature flags, app config)
```

## Data Models

See `DATA_MODELS.md` for detailed schema.

## Navigation Structure

```
AppNavigator (Root)
├── MainTabsNavigator
│   ├── PlacesTab
│   │   ├── PlacesListScreen
│   │   └── PlaceDetailScreen
│   ├── MapTab
│   │   └── MapScreen
│   ├── ItinerariesTab
│   │   ├── ItinerariesListScreen
│   │   └── ItineraryDetailScreen
│   └── MoreTab
│       ├── MoreScreen
│       ├── ToursScreen
│       ├── TipsScreen
│       ├── HotelsScreen
│       ├── WeatherScreen
│       └── FavoritesScreen
└── Modals
    └── AffiliateLinkModal
```

## State Management Strategy

### Global State (Zustand Stores)
- `useAppStore` - App-wide settings (theme, language, offline status)
- `useFavoritesStore` - Favorites/wishlist state
- `useLocationStore` - User location state

### Local State
- Component-level state for UI interactions
- React Query or SWR for server state (if needed for weather/tours)

## Offline Strategy

1. **Initial Data**: Embedded SQLite database in app bundle
2. **Sync Mechanism**: 
   - Background sync when online
   - Version-based updates
   - Incremental updates (only changed records)
3. **Conflict Resolution**: Last-write-wins or timestamp-based
4. **Caching**:
   - Map tiles: Pre-bundled or cached on first load
   - Images: Lazy-loaded and cached
   - API responses: Cached with expiration

## Monetization Architecture

### Feature Flags
```typescript
{
  adsEnabled: boolean
  iapEnabled: boolean
  premiumItinerariesLocked: boolean
  premiumMapsLocked: boolean
}
```

### Implementation Points
- Ads: Interstitial on certain screens, banner at bottom
- IAP: Purchase flow for premium features
- Affiliate Links: Tracked, clearly disclosed
- Remote Config: Fetch from server, fallback to defaults

## Scalability Considerations

1. **Lazy Loading**: Code splitting for screens
2. **Image Optimization**: Lazy loading, compression
3. **Database Indexing**: Proper indexes on frequently queried fields
4. **Pagination**: For large lists
5. **Memoization**: React.memo, useMemo, useCallback where needed

