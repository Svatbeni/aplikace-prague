import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../../../shared/theme';
import { PlaceRepository } from '../../../shared/repositories/PlaceRepository';
import { Place, PlaceCategory } from '../../../types';
import { getCategoryColor } from '../../../shared/theme/colors';
import { categoryIcons } from '../../../shared/constants/categories';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

interface MapScreenProps {
  navigation: any;
}

// Ultra-lightweight marker - minimal re-renders
const CategoryMarker = React.memo<{
  category: PlaceCategory;
  isDark: boolean;
}>(({ category, isDark }) => {
  const iconName = categoryIcons[category] as keyof typeof Ionicons.glyphMap;
  const color = getCategoryColor(category, isDark);
  
  return (
    <View style={[styles.markerContainer, { backgroundColor: color }]}>
      <Ionicons name={iconName} size={16} color="#FFFFFF" />
    </View>
  );
}, (prev, next) => prev.category === next.category && prev.isDark === next.isDark);

CategoryMarker.displayName = 'CategoryMarker';

export const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  useEffect(() => {
    loadPlaces();
    requestLocationPermission();
  }, []);

  // Disable tracksViewChanges after map is ready for better performance
  const handleMapReady = () => {
    setTimeout(() => {
      setTracksViewChanges(false);
    }, 500);
  };

  const loadPlaces = async () => {
    try {
      setIsLoading(true);
      const repo = new PlaceRepository();
      const allPlaces = await repo.getAll();
      setPlaces(allPlaces);
    } catch (error) {
      console.error('Failed to load places:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  };

  const filteredPlaces = useMemo(() => {
    return selectedCategory
      ? places.filter((p) => p.category === selectedCategory)
      : places;
  }, [places, selectedCategory]);

  const region = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 50.0755, // Prague center
        longitude: 14.4378,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={true}
        removeClippedSubviews={true}
        maxZoomLevel={18}
        onMapReady={handleMapReady}
      >
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            description={place.shortDescription}
            onPress={() => {
              navigation.navigate('PlaceDetail', { placeId: place.id });
            }}
            tracksViewChanges={tracksViewChanges}
          >
            <CategoryMarker category={place.category} isDark={theme.isDark} />
          </Marker>
        ))}
      </MapView>

      {/* Category Filter Overlay */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor:
                selectedCategory === null
                  ? theme.colors.primary
                  : theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                  selectedCategory === null
                    ? '#FFFFFF'
                    : theme.colors.text,
              },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {(Object.values(PlaceCategory) as PlaceCategory[]).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedCategory === category
                    ? theme.colors.primary
                    : theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            <Ionicons
              name="ellipse"
              size={12}
              color={
                selectedCategory === category
                  ? '#FFFFFF'
                  : getCategoryColor(category, theme.isDark)
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  filterContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

