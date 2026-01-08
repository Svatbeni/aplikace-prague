import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { HotelCard } from '../../../shared/components/HotelCard';
import { useTheme } from '../../../shared/theme';
import { HotelRepository } from '../../../shared/repositories/HotelRepository';
import { Hotel } from '../../../types';
import { Ionicons } from '@expo/vector-icons';

interface HotelsListScreenProps {
  navigation: any;
}

export const HotelsListScreen: React.FC<HotelsListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    if (selectedArea) {
      const filtered = hotels.filter((h) => h.area === selectedArea);
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels);
    }
  }, [selectedArea, hotels]);

  const loadHotels = async () => {
    try {
      setIsLoading(true);
      const repo = new HotelRepository();
      const allHotels = await repo.getAll();
      setHotels(allHotels);
      setFilteredHotels(allHotels);
    } catch (error) {
      console.error('Failed to load hotels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique areas from loaded hotels
  const areas = useMemo(() => {
    if (hotels.length === 0) {
      return [null];
    }
    const areaSet = new Set<string>();
    hotels.forEach((hotel) => {
      if (hotel.area) {
        areaSet.add(hotel.area);
      }
    });
    return [null, ...Array.from(areaSet).sort()];
  }, [hotels]);

  const renderAreaFilter = () => (
    <View style={styles.categoryContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={areas}
        keyExtractor={(item) => item || 'all'}
        renderItem={({ item }) => {
          const isSelected = selectedArea === item;
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
              onPress={() => setSelectedArea(item)}
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
          Loading hotels...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {renderAreaFilter()}
      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onPress={() =>
              navigation.navigate('HotelDetail', { hotelId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bed-outline" size={48} color={theme.colors.textTertiary} />
            <Text
              style={[
                styles.emptyText,
                { color: theme.colors.textSecondary },
              ]}
            >
              No hotels found
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
