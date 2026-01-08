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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ToursListScreenProps {
  navigation: any;
}

const getTourCategoryColor = (category: string | null, isDark: boolean): string => {
  if (!category) return isDark ? '#42A5F5' : '#1E88E5';
  
  const colors = isDark ? {
    sightseeing: '#42A5F5',
    walking: '#BA68C8',
    cruise: '#42A5F5',
    food: '#FFB74D',
    beer: '#FFB74D',
    dayTrip: '#81C784',
    segway: '#EF5350',
  } : {
    sightseeing: '#2196F3',
    walking: '#9C27B0',
    cruise: '#2196F3',
    food: '#FF9800',
    beer: '#FF9800',
    dayTrip: '#4CAF50',
    segway: '#F44336',
  };

  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('sightseeing')) return colors.sightseeing;
  if (categoryLower.includes('walking')) return colors.walking;
  if (categoryLower.includes('cruise')) return colors.cruise;
  if (categoryLower.includes('food')) return colors.food;
  if (categoryLower.includes('beer')) return colors.beer;
  if (categoryLower.includes('day trip')) return colors.dayTrip;
  if (categoryLower.includes('segway')) return colors.segway;
  
  return isDark ? '#42A5F5' : '#1E88E5';
};

const getTourCategoryIcon = (category: string | null): keyof typeof Ionicons.glyphMap | null => {
  if (!category) return null;
  
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('sightseeing')) return 'star';
  if (categoryLower.includes('walking')) return 'footsteps';
  if (categoryLower.includes('cruise')) return 'boat';
  if (categoryLower.includes('food')) return 'restaurant';
  if (categoryLower.includes('beer')) return 'wine';
  if (categoryLower.includes('day trip')) return 'map';
  if (categoryLower.includes('segway')) return 'bicycle';
  
  return 'ticket';
};

export const ToursListScreen: React.FC<ToursListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
    <View style={[styles.categoryContainer, { 
      backgroundColor: theme.colors.background,
      paddingTop: insets.top + 8,
    }]}>
      <View style={styles.filterWrapper}>
        {categories.map((item) => {
          const isSelected = selectedCategory === item;
          const categoryColor = getTourCategoryColor(item, theme.isDark);
          const iconName = getTourCategoryIcon(item);
          
          return (
            <TouchableOpacity
              key={item || 'all'}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected
                    ? (item ? categoryColor : theme.colors.primary)
                    : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              {iconName && (
                <Ionicons
                  name={iconName}
                  size={12}
                  color={isSelected ? '#FFFFFF' : (item ? categoryColor : theme.colors.text)}
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
                {item || 'All'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
