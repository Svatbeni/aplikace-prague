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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HotelsListScreenProps {
  navigation: any;
}

const getHotelAreaColor = (area: string | null, isDark: boolean): string => {
  if (!area) return isDark ? '#42A5F5' : '#1E88E5';
  
  const colors = isDark ? {
    oldTown: '#BA68C8',
    newTown: '#42A5F5',
    castle: '#EF5350',
    vinohrady: '#81C784',
    zizkov: '#FFB74D',
    malastrana: '#64B5F6',
  } : {
    oldTown: '#9C27B0',
    newTown: '#2196F3',
    castle: '#F44336',
    vinohrady: '#4CAF50',
    zizkov: '#FF9800',
    malastrana: '#42A5F5',
  };

  const areaLower = area.toLowerCase();
  if (areaLower.includes('old town') || areaLower.includes('staré město')) return colors.oldTown;
  if (areaLower.includes('new town') || areaLower.includes('nové město')) return colors.newTown;
  if (areaLower.includes('castle') || areaLower.includes('hrad')) return colors.castle;
  if (areaLower.includes('vinohrady')) return colors.vinohrady;
  if (areaLower.includes('žižkov') || areaLower.includes('zizkov')) return colors.zizkov;
  if (areaLower.includes('malá strana') || areaLower.includes('mala strana')) return colors.malastrana;
  
  return isDark ? '#42A5F5' : '#1E88E5';
};

const getHotelAreaIcon = (area: string | null): keyof typeof Ionicons.glyphMap | null => {
  if (!area) return null;
  
  const areaLower = area.toLowerCase();
  if (areaLower.includes('old town') || areaLower.includes('staré město')) return 'home';
  if (areaLower.includes('new town') || areaLower.includes('nové město')) return 'business';
  if (areaLower.includes('castle') || areaLower.includes('hrad')) return 'shield';
  if (areaLower.includes('vinohrady')) return 'leaf';
  if (areaLower.includes('žižkov') || areaLower.includes('zizkov')) return 'beer';
  if (areaLower.includes('malá strana') || areaLower.includes('mala strana')) return 'location';
  
  return 'bed';
};

export const HotelsListScreen: React.FC<HotelsListScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
    <View style={[styles.categoryContainer, { 
      backgroundColor: theme.colors.background,
      paddingTop: insets.top + 8,
    }]}>
      <View style={styles.filterWrapper}>
        {areas.map((item) => {
          const isSelected = selectedArea === item;
          const areaColor = getHotelAreaColor(item, theme.isDark);
          const iconName = getHotelAreaIcon(item);
          
          return (
            <TouchableOpacity
              key={item || 'all'}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected
                    ? (item ? areaColor : theme.colors.primary)
                    : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedArea(item)}
            >
              {iconName && (
                <Ionicons
                  name={iconName}
                  size={12}
                  color={isSelected ? '#FFFFFF' : (item ? areaColor : theme.colors.text)}
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
