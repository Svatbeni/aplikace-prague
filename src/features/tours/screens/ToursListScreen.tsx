import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { TourCard } from '../../../shared/components/TourCard';
import { useTheme } from '../../../shared/theme';
import { TourRepository } from '../../../shared/repositories/TourRepository';
import { Tour } from '../../../types';
import { Ionicons } from '@expo/vector-icons';

interface ToursListScreenProps {
  navigation: any;
}

export const ToursListScreen: React.FC<ToursListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTours();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = tours.filter((t) => t.category === selectedCategory);
      setFilteredTours(filtered);
    } else {
      setFilteredTours(tours);
    }
  }, [selectedCategory, tours]);

  const loadTours = async () => {
    try {
      setIsLoading(true);
      const repo = new TourRepository();
      const allTours = await repo.getAll();
      setTours(allTours);
      setFilteredTours(allTours);
    } catch (error) {
      console.error('Failed to load tours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from loaded tours
  const categories = useMemo(() => {
    if (tours.length === 0) {
      return [null];
    }
    const categorySet = new Set<string>();
    tours.forEach((tour) => {
      if (tour.category) {
        categorySet.add(tour.category);
      }
    });
    return [null, ...Array.from(categorySet).sort()];
  }, [tours]);

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
                {item || 'All'}
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
          Loading tours...
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
        data={filteredTours}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TourCard
            tour={item}
            onPress={() =>
              navigation.navigate('TourDetail', { tourId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="ticket-outline" size={48} color={theme.colors.textTertiary} />
            <Text
              style={[
                styles.emptyText,
                { color: theme.colors.textSecondary },
              ]}
            >
              No tours found
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
