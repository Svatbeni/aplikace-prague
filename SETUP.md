# Setup Guide

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Expo CLI (will be installed globally or via npx)
- iOS Simulator (for Mac) or Android Emulator / Physical device with Expo Go app

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native and Expo SDK
- Navigation libraries
- Database (SQLite)
- Maps (react-native-maps)
- State management (Zustand)
- And more...

### 2. Create Assets Directory

Create the following directory structure and add placeholder assets:

```
assets/
├── icon.png          (1024x1024, app icon)
├── adaptive-icon.png (Android adaptive icon)
├── splash.png        (1242x2436, splash screen)
└── favicon.png       (48x48, web favicon)
```

For now, you can use Expo's default assets or create simple placeholders.

### 3. Start Development Server

```bash
npm start
```

This will:
- Start the Expo development server
- Show a QR code for Expo Go app
- Open Expo DevTools

### 4. Run on Device/Emulator

#### iOS Simulator (Mac only)
```bash
npm run ios
```

#### Android Emulator
```bash
npm run android
```

#### Physical Device
- Install "Expo Go" app from App Store / Play Store
- Scan the QR code from the terminal
- App will load on your device

## First Launch

On first launch, the app will:
1. Initialize the SQLite database
2. Create all required tables
3. Seed the database with 8 sample places
4. Initialize app settings
5. Load favorites (empty initially)

## Development Workflow

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Clear Cache (if issues occur)
```bash
npm start -- --clear
```

## Project Structure Overview

```
├── App.tsx                    # Main app entry point
├── app.json                   # Expo configuration
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── src/
│   ├── features/              # Feature modules
│   │   ├── places/           # Places feature
│   │   ├── map/              # Map feature
│   │   ├── itineraries/      # Itineraries (coming soon)
│   │   └── more/             # More tab
│   ├── navigation/           # Navigation setup
│   ├── shared/               # Shared resources
│   │   ├── components/       # Reusable components
│   │   ├── services/         # Services (DB, seed data)
│   │   ├── repositories/     # Data access layer
│   │   ├── stores/           # State management
│   │   ├── theme/            # Design system
│   │   └── constants/        # Constants
│   └── types/                # TypeScript types
└── assets/                    # Images, icons, etc.
```

## Common Issues & Solutions

### Issue: Metro bundler cache issues
**Solution**: 
```bash
npm start -- --clear
```

### Issue: Database not initializing
**Solution**: Delete app and reinstall, or clear Expo cache

### Issue: Maps not showing
**Solution**: 
- For iOS: Maps work out of the box
- For Android: May need Google Maps API key (currently using default)
  - Add to `app.json` if needed:
  ```json
  "android": {
    "config": {
      "googleMaps": {
        "apiKey": "YOUR_API_KEY"
      }
    }
  }
  ```

### Issue: TypeScript errors
**Solution**: 
```bash
npm run type-check
```
Fix any reported errors or update types accordingly

## Adding New Places

Edit `src/shared/services/seedData.ts` and add to the `samplePlaces` array:

```typescript
{
  id: 'unique-id',
  name: 'Place Name',
  shortDescription: 'Brief description',
  description: 'Full description...',
  practicalTips: 'Tips for visitors...',
  category: PlaceCategory.SIGHTSEEING, // or other category
  latitude: 50.0000,
  longitude: 14.0000,
  images: [], // Add image URLs here
  address: 'Address string',
  estimatedVisitDuration: 60, // minutes
  priceRange: 'free', // or 'low', 'medium', 'high'
  isPremium: false,
}
```

Then delete the app and reinstall, or clear the database programmatically.

## Next Steps

1. **Add Images**: Place images in assets folder and reference them
2. **Extend Features**: Implement Itineraries, Tours, Tips, Hotels, Weather
3. **Add More Data**: Expand seed data with more places
4. **Styling**: Customize theme colors if needed
5. **Localization**: Add i18n translations (currently English only)
6. **Offline Maps**: Set up offline map tile caching
7. **Image Caching**: Implement proper image loading and caching
8. **Testing**: Add unit and integration tests

## Production Build

When ready for production:

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

(Requires EAS account setup - see Expo docs)

## Environment Variables

For API keys and sensitive data, use `expo-constants` with `.env` files:

1. Install: `npm install react-native-dotenv`
2. Create `.env` file (add to `.gitignore`)
3. Access via `process.env.VARIABLE_NAME`

Currently not needed for basic functionality.

