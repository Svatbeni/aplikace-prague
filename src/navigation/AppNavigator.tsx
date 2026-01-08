import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@expo/vector-icons';
import { useTheme } from '../shared/theme';
import { RootStackParamList, MainTabsParamList } from '../types';

// Screens
import { PlacesListScreen } from '../features/places/screens/PlacesListScreen';
import { PlaceDetailScreen } from '../features/places/screens/PlaceDetailScreen';
import { MapScreen } from '../features/map/screens/MapScreen';
import { ItinerariesListScreen } from '../features/itineraries/screens/ItinerariesListScreen';
import { MoreScreen } from '../features/more/screens/MoreScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabsNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Places"
        component={PlacesListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-pin" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Places to Visit',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Itineraries"
        component={ItinerariesListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="route" size={size} color={color} />
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
            <Icon name="menu" size={size} color={color} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

