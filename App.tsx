import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppStore } from './src/shared/stores/appStore';
import { useFavoritesStore } from './src/shared/stores/favoritesStore';
import { initDatabase } from './src/shared/services/database';
import { seedDatabase } from './src/shared/services/seedData';
import { useTheme } from './src/shared/theme';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { initialize } = useAppStore();
  const { loadFavorites } = useFavoritesStore();
  const theme = useTheme();

  useEffect(() => {
    setupApp();
  }, []);

  const setupApp = async () => {
    try {
      // Initialize database
      await initDatabase();

      // Seed initial data if needed
      await seedDatabase();

      // Initialize app store (loads settings)
      await initialize();

      // Load favorites
      await loadFavorites();

      setIsReady(true);
    } catch (error) {
      console.error('Failed to setup app:', error);
      setIsReady(true); // Continue anyway
    }
  };

  if (!isReady) {
    return (
      <SafeAreaProvider>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

