import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../shared/theme';
import { RootStackParamList, MainTabsParamList } from '../types';

// Screens
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { PlacesListScreen } from '../features/places/screens/PlacesListScreen';
import { PlaceDetailScreen } from '../features/places/screens/PlaceDetailScreen';
import { ToursListScreen } from '../features/tours/screens/ToursListScreen';
import { TourDetailScreen } from '../features/tours/screens/TourDetailScreen';
import { HotelsListScreen } from '../features/hotels/screens/HotelsListScreen';
import { HotelDetailScreen } from '../features/hotels/screens/HotelDetailScreen';
import { MapScreen } from '../features/map/screens/MapScreen';
import { ItinerariesListScreen } from '../features/itineraries/screens/ItinerariesListScreen';
import { MoreScreen } from '../features/more/screens/MoreScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabsNavigator = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 4,
          height: 60 + Math.max(insets.bottom, 8),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Places"
        component={PlacesListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Places to Visit',
        }}
      />
      <Tab.Screen
        name="Tours"
        component={ToursListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Tours',
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={HotelsListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bed" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Hotels',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Itineraries"
        component={ItinerariesListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Itineraries',
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'More',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="TourDetail"
          component={TourDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="HotelDetail"
          component={HotelDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

