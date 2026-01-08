import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { PlaceCard } from '../../../shared/components/PlaceCard';
import { useTheme } from '../../../shared/theme';
import { PlaceRepository } from '../../../shared/repositories/PlaceRepository';
import { Place, PlaceCategory } from '../../../types';
import { categoryLabels, categoryIcons } from '../../../shared/constants/categories';
import { getCategoryColor } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PlacesListScreenProps {
  navigation: any;
}

type FilterType = 'nearest' | PlaceCategory | null;

export const PlacesListScreen: React.FC<PlacesListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(PlaceCategory.SIGHTSEEING);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  useEffect(() => {
    loadPlaces();
    if (selectedFilter === 'nearest') {
      requestLocationPermission();
    }
  }, []);

  useEffect(() => {
    applyFilter();
  }, [selectedFilter, places, userLocation]);

  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      setLocationPermissionDenied(false);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        setLocationPermissionDenied(true);
      }
    } catch (error) {
      console.error('Failed to get location:', error);
      setLocationPermissionDenied(true);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const applyFilter = async () => {
    let filtered = [...places];

    if (selectedFilter === 'nearest') {
      if (userLocation) {
        // Calculate distances and sort
        filtered = filtered
          .map((place) => ({
            place,
            distance: calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              place.latitude,
              place.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance)
          .map((item) => item.place);
      } else if (!isLoadingLocation && !locationPermissionDenied) {
        // If location is not available and we're not loading, request it
        await requestLocationPermission();
        return; // Will re-run after location is set
      }
      // If permission denied, just show all places without sorting
    } else if (selectedFilter) {
      filtered = filtered.filter((p) => p.category === selectedFilter);
    }

    setFilteredPlaces(filtered);
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

  const handleFilterChange = async (filter: FilterType) => {
    setSelectedFilter(filter);
    if (filter === 'nearest' && !userLocation && !locationPermissionDenied) {
      await requestLocationPermission();
    }
  };

  const filters: FilterType[] = [
    'nearest',
    PlaceCategory.SIGHTSEEING,
    PlaceCategory.HIDDEN_GEMS,
    PlaceCategory.BIZARRE,
    PlaceCategory.VIEWPOINTS,
    PlaceCategory.PARKS,
    PlaceCategory.CULTURE,
    PlaceCategory.FOOD,
    PlaceCategory.NIGHTLIFE,
    PlaceCategory.KIDS,
  ];

  const getFilterLabel = (filter: FilterType): string => {
    if (filter === 'nearest') return 'Nearest';
    if (filter === null) return 'All';
    return categoryLabels[filter];
  };

  const renderCategoryFilter = () => (
    <View style={[styles.categoryContainer, { 
      backgroundColor: theme.colors.background,
      paddingTop: insets.top + 8,
    }]}>
      <View style={styles.filterWrapper}>
        {filters.map((item) => {
          const isSelected = selectedFilter === item;
          let iconName: keyof typeof Ionicons.glyphMap | null = null;
          let categoryColor = theme.colors.primary;
          
          if (item === 'nearest') {
            iconName = 'location';
          } else {
            iconName = categoryIcons[item] as keyof typeof Ionicons.glyphMap;
            categoryColor = getCategoryColor(item, theme.isDark);
          }

          return (
            <TouchableOpacity
              key={item === 'nearest' ? 'nearest' : item}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected
                    ? (item === 'nearest' ? theme.colors.primary : categoryColor)
                    : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleFilterChange(item)}
            >
              {iconName && (
                <Ionicons
                  name={iconName}
                  size={12}
                  color={isSelected ? '#FFFFFF' : (item === 'nearest' ? theme.colors.text : categoryColor)}
                  style={styles.filterIcon}
                />
              )}
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color: isSelected ? '#FFFFFF' : theme.colors.text,
                  },
                ]}
              >
                {getFilterLabel(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  if (isLoading || (selectedFilter === 'nearest' && isLoadingLocation && !userLocation)) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          style={[
            styles.loadingText,
            { color: theme.colors.textSecondary },
          ]}
        >
          {isLoadingLocation && selectedFilter === 'nearest'
            ? 'Getting your location...'
            : 'Loading places...'}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {renderCategoryFilter()}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            onPress={() =>
              navigation.navigate('PlaceDetail', { placeId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={48} color={theme.colors.textTertiary} />
            <Text
              style={[
                styles.emptyText,
                { color: theme.colors.textSecondary },
              ]}
            >
              No places found
            </Text>
          </View>
        }
      />
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
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  categoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 36,
  },
  filterIcon: {
    marginRight: 0,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});

