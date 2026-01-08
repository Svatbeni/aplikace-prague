import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { ItineraryRepository } from '../../../shared/repositories/ItineraryRepository';
import { PlaceRepository } from '../../../shared/repositories/PlaceRepository';
import { Itinerary, Place, ItineraryType, Difficulty, FavoriteType, ItineraryPlace } from '../../../types';
import { useFavoritesStore } from '../../../shared/stores/favoritesStore';
import { Ionicons } from '@expo/vector-icons';

interface ItineraryDetailScreenProps {
  route: { params: { itineraryId: string } };
  navigation: any;
}

interface ItineraryPlaceWithDetails extends ItineraryPlace {
  place?: Place;
}

export const ItineraryDetailScreen: React.FC<ItineraryDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const { itineraryId } = route.params;
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [places, setPlaces] = useState<ItineraryPlaceWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(FavoriteType.ITINERARY, itineraryId);

  useEffect(() => {
    loadItinerary();
  }, [itineraryId]);

  const loadItinerary = async () => {
    try {
      setIsLoading(true);
      const itineraryRepo = new ItineraryRepository();
      const placeRepo = new PlaceRepository();
      
      const itineraryData = await itineraryRepo.getById(itineraryId);
      if (!itineraryData) {
        return;
      }
      
      setItinerary(itineraryData);

      // Load place details for each place in itinerary
      const placesWithDetails: ItineraryPlaceWithDetails[] = await Promise.all(
        itineraryData.places.map(async (itineraryPlace) => {
          const place = await placeRepo.getById(itineraryPlace.placeId);
          return {
            ...itineraryPlace,
            place: place || undefined,
          };
        })
      );

      setPlaces(placesWithDetails);
    } catch (error) {
      console.error('Failed to load itinerary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async () => {
    await toggleFavorite(FavoriteType.ITINERARY, itineraryId);
  };

  const handlePlacePress = (placeId: string) => {
    navigation.navigate('PlaceDetail', { placeId });
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    return `${hours}h ${mins}m`;
  };

  const getItineraryTypeLabel = (type: ItineraryType): string => {
    switch (type) {
      case ItineraryType.ONE_DAY:
        return '1 Day';
      case ItineraryType.TWO_DAYS:
        return '2 Days';
      case ItineraryType.THREE_DAYS:
        return '3 Days';
      case ItineraryType.THEMATIC:
        return 'Thematic';
      default:
        return 'Itinerary';
    }
  };

  const getDifficultyColor = (difficulty: Difficulty | undefined): string => {
    if (!difficulty) return theme.colors.primary;
    
    const colors = theme.isDark ? {
      easy: '#81C784',
      moderate: '#FFB74D',
      challenging: '#EF5350',
    } : {
      easy: '#4CAF50',
      moderate: '#FF9800',
      challenging: '#F44336',
    };
    
    return colors[difficulty];
  };

  if (isLoading || !itinerary) {
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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavorite}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={24}
            color={isFav ? '#FF1744' : theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title and badges */}
        <View style={styles.badgesContainer}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Ionicons name="map-outline" size={16} color="#FFFFFF" />
            <Text style={styles.typeText}>
              {getItineraryTypeLabel(itinerary.type)}
            </Text>
          </View>
          {itinerary.difficulty && itinerary.difficulty.trim() ? (
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(itinerary.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>
                {itinerary.difficulty.charAt(0).toUpperCase() + itinerary.difficulty.slice(1)}
              </Text>
            </View>
          ) : null}
          {itinerary.isPremium ? (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          ) : null}
        </View>

        {itinerary.title && itinerary.title.trim() ? (
          <Text
            style={[styles.title, { color: theme.colors.text }]}
          >
            {itinerary.title}
          </Text>
        ) : null}

        {/* Meta info */}
        <View style={styles.metaContainer}>
          {itinerary.estimatedDuration > 0 && (
            <View style={styles.meta}>
              <Ionicons
                name="time-outline"
                size={18}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[styles.metaText, { color: theme.colors.textSecondary }]}
              >
                {formatDuration(itinerary.estimatedDuration)}
              </Text>
            </View>
          )}
          {itinerary.walkingDistance != null && itinerary.walkingDistance > 0 && (
            <View style={styles.meta}>
              <Ionicons
                name="walk-outline"
                size={18}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[styles.metaText, { color: theme.colors.textSecondary }]}
              >
                {itinerary.walkingDistance.toFixed(1)} km
              </Text>
            </View>
          )}
          <View style={styles.meta}>
            <Ionicons
              name="location-outline"
              size={18}
              color={theme.colors.textTertiary}
            />
            <Text
              style={[styles.metaText, { color: theme.colors.textSecondary }]}
            >
              {`${places.length} ${places.length === 1 ? 'place' : 'places'}`}
            </Text>
          </View>
        </View>

        {/* Description */}
        {itinerary.description && itinerary.description.trim() ? (
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {itinerary.description}
          </Text>
        ) : null}

        {/* Places */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text }]}
          >
            Route
          </Text>
          {places.map((item, index) => {
            if (!item) return null;
            return (
              <View key={index} style={styles.placeItem}>
                <View style={styles.placeNumber}>
                  <Text style={styles.placeNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.placeContent}>
                  {item.place ? (
                    <TouchableOpacity
                      onPress={() => handlePlacePress(item.place!.id)}
                    >
                      <Text
                        style={[styles.placeName, { color: theme.colors.text }]}
                      >
                        {item.place.name && item.place.name.trim() ? item.place.name : 'Unknown Place'}
                      </Text>
                      {item.place.shortDescription && item.place.shortDescription.trim() ? (
                        <Text
                          style={[
                            styles.placeDescription,
                            { color: theme.colors.textSecondary },
                          ]}
                          numberOfLines={2}
                        >
                          {item.place.shortDescription}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={[styles.placeName, { color: theme.colors.textTertiary }]}
                    >
                      {`Place ID: ${item.placeId || 'unknown'}`}
                    </Text>
                  )}
                  {item.notes && item.notes.trim() ? (
                    <Text
                      style={[
                        styles.placeNotes,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {item.notes}
                    </Text>
                  ) : null}
                  <View style={styles.placeMeta}>
                    <View style={styles.placeMetaItem}>
                      <Ionicons
                        name="time-outline"
                        size={12}
                        color={theme.colors.textTertiary}
                      />
                      <Text
                        style={[
                          styles.placeMetaText,
                          { color: theme.colors.textTertiary },
                        ]}
                      >
                        {`${item.estimatedDuration ?? 0} min`}
                      </Text>
                    </View>
                    {item.transportTime != null && item.transportTime > 0 ? (
                      <View style={styles.placeMetaItem}>
                        <Ionicons
                          name="walk-outline"
                          size={12}
                          color={theme.colors.textTertiary}
                        />
                        <Text
                          style={[
                            styles.placeMetaText,
                            { color: theme.colors.textTertiary },
                          ]}
                        >
                          {`${item.transportTime} min walk`}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Transport hints */}
        {itinerary.transportHints && itinerary.transportHints.length > 0 ? (
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.text }]}
            >
              Transport Tips
            </Text>
            {itinerary.transportHints
              .filter((hint) => hint && hint.trim())
              .map((hint, index) => (
                <View key={index} style={styles.hintItem}>
                  <Ionicons
                    name="information-circle-outline"
                    size={16}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[
                      styles.hintText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {hint}
                  </Text>
                </View>
              ))}
          </View>
        ) : null}
      </View>
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  premiumText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  placeItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  placeNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  placeNumberText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '600',
  },
  placeContent: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  placeNotes: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  placeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  placeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  placeMetaText: {
    fontSize: 12,
  },
  hintItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  hintText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
