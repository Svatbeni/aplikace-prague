import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../../../shared/theme';
import { PlaceRepository } from '../../../shared/repositories/PlaceRepository';
import { Place, PlaceCategory } from '../../../types';
import { getCategoryColor } from '../../../shared/theme/colors';
import { categoryIcons, categoryLabels } from '../../../shared/constants/categories';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

// Lightweight popup card component
const PlaceCallout = React.memo<{
  place: Place;
  theme: ReturnType<typeof useTheme>;
  onPress: () => void;
}>(({ place, theme, onPress }) => {
  const categoryColor = getCategoryColor(place.category, theme.isDark);
  
  return (
    <TouchableOpacity
      style={[
        styles.calloutContainer,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.calloutContent}>
        <View style={styles.calloutHeader}>
          <Text
            style={[styles.calloutTitle, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {place.name}
          </Text>
          <View
            style={[
              styles.calloutCategoryBadge,
              { backgroundColor: categoryColor },
            ]}
          >
            <Text style={styles.calloutCategoryText}>
              {categoryLabels[place.category]}
            </Text>
          </View>
        </View>
        <Text
          style={[styles.calloutDescription, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
        >
          {place.shortDescription}
        </Text>
        <View style={styles.calloutFooter}>
          {place.estimatedVisitDuration && (
            <View style={styles.calloutMeta}>
              <Ionicons
                name="time-outline"
                size={14}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[styles.calloutMetaText, { color: theme.colors.textTertiary }]}
              >
                {place.estimatedVisitDuration} min
              </Text>
            </View>
          )}
          <View style={styles.calloutArrow}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}, (prev, next) => prev.place.id === next.place.id);

PlaceCallout.displayName = 'PlaceCallout';

export const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filterHeight, setFilterHeight] = useState(60); // Default height
  const tracksTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    loadPlaces();
    requestLocationPermission();
  }, []);

  // Clear selected place and manage tracksViewChanges when category filter changes
  useEffect(() => {
    setSelectedPlace(null);
    
    // Clear any existing timeout
    if (tracksTimeoutRef.current) {
      clearTimeout(tracksTimeoutRef.current);
    }
    
    // Enable tracksViewChanges immediately for smooth marker updates
    setTracksViewChanges(true);
    
    // Disable after markers have been updated
    tracksTimeoutRef.current = setTimeout(() => {
      setTracksViewChanges(false);
      tracksTimeoutRef.current = null;
    }, 800);
    
    return () => {
      if (tracksTimeoutRef.current) {
        clearTimeout(tracksTimeoutRef.current);
        tracksTimeoutRef.current = null;
      }
    };
  }, [selectedCategory]);

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

  const handleMyLocationPress = async () => {
    if (!userLocation) {
      // Try to get location again if we don't have it
      await requestLocationPermission();
      return;
    }

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 500);
    }
  };

  const filteredPlaces = useMemo(() => {
    if (!places || places.length === 0) {
      return [];
    }
    if (selectedCategory === null) {
      return places;
    }
    return places.filter((p) => p.category === selectedCategory);
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
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={false}
        removeClippedSubviews={false}
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
            tracksViewChanges={tracksViewChanges}
            onPress={() => {
              setSelectedPlace(place);
            }}
          >
            <CategoryMarker category={place.category} isDark={theme.isDark} />
          </Marker>
        ))}
      </MapView>

      {/* Custom Popup Overlay */}
      {selectedPlace && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayBackdrop}
            activeOpacity={1}
            onPress={() => setSelectedPlace(null)}
          />
          <View style={styles.popupContainer}>
            <PlaceCallout
              place={selectedPlace}
              theme={theme}
              onPress={() => {
                navigation.navigate('PlaceDetail', { placeId: selectedPlace.id });
                setSelectedPlace(null);
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPlace(null)}
            >
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Category Filter Overlay */}
      <View
        style={[styles.filterContainer, { top: insets.top + 5 }]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setFilterHeight(height);
        }}
      >
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
          onPress={() => {
            setSelectedCategory(null);
          }}
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
        {(Object.values(PlaceCategory) as PlaceCategory[]).map((category) => {
          const iconName = categoryIcons[category] as keyof typeof Ionicons.glyphMap;
          const isSelected = selectedCategory === category;
          const categoryColor = getCategoryColor(category, theme.isDark);
          
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    isSelected
                      ? theme.colors.primary
                      : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => {
                // Explicitly set the new category (don't toggle if already selected)
                const newCategory = isSelected ? null : category;
                setSelectedCategory(newCategory);
              }}
            >
              <Ionicons
                name={iconName}
                size={14}
                color={isSelected ? '#FFFFFF' : categoryColor}
                style={styles.filterIcon}
              />
              <Text
                style={[
                  styles.filterButtonText,
                  {
                    color: isSelected ? '#FFFFFF' : theme.colors.text,
                  },
                ]}
              >
                {categoryLabels[category]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* My Location Button */}
      <TouchableOpacity
        style={[
          styles.myLocationButton,
          {
            top: insets.top + filterHeight + 21, // 5 (filter top) + filterHeight + 8 (gap)
          },
        ]}
        onPress={handleMyLocationPress}
        disabled={!userLocation}
      >
        <Ionicons
          name="locate"
          size={20}
          color={userLocation ? theme.colors.primary : theme.colors.textTertiary}
        />
      </TouchableOpacity>
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
    right: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: Dimensions.get('window').width - 32,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    minHeight: 36,
  },
  filterIcon: {
    marginRight: 0,
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
  calloutWrapper: {
    width: Math.min(Dimensions.get('window').width * 0.75, 350),
  },
  calloutContainer: {
    width: '100%',
    minHeight: 160,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  calloutContent: {
    padding: 18,
  },
  calloutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  calloutTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  calloutCategoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  calloutCategoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  calloutDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  calloutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calloutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calloutMetaText: {
    fontSize: 13,
  },
  calloutArrow: {
    marginLeft: 'auto',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 400,
    position: 'relative',
    zIndex: 1001,
  },
  closeButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1002,
  },
  myLocationButton: {
    position: 'absolute',
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

