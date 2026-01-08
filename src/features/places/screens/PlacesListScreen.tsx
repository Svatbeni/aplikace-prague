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
import { categoryLabels } from '../../../shared/constants/categories';
import { Icon } from '@expo/vector-icons';

interface PlacesListScreenProps {
  navigation: any;
}

export const PlacesListScreen: React.FC<PlacesListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlaces();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = places.filter((p) => p.category === selectedCategory);
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  }, [selectedCategory, places]);

  const loadPlaces = async () => {
    try {
      setIsLoading(true);
      const repo = new PlaceRepository();
      const allPlaces = await repo.getAll();
      setPlaces(allPlaces);
      setFilteredPlaces(allPlaces);
    } catch (error) {
      console.error('Failed to load places:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories: (PlaceCategory | null)[] = [
    null,
    PlaceCategory.SIGHTSEEING,
    PlaceCategory.HIDDEN_GEMS,
    PlaceCategory.FOOD,
    PlaceCategory.NATURE,
    PlaceCategory.VIEWPOINTS,
  ];

  const renderCategoryFilter = () => (
    <View style={styles.categoryContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item || 'all'}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item;
          return (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color: isSelected
                      ? '#FFFFFF'
                      : theme.colors.text,
                  },
                ]}
              >
                {item ? categoryLabels[item] : 'All'}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );

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
        <Text
          style={[
            styles.loadingText,
            { color: theme.colors.textSecondary },
          ]}
        >
          Loading places...
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
        keyExtractor={(item) => item.id}
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
            <Icon name="map-pin" size={48} color={theme.colors.textTertiary} />
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
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

