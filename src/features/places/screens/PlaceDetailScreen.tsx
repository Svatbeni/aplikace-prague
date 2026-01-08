import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { PlaceRepository } from '../../../shared/repositories/PlaceRepository';
import { Place } from '../../../types';
import { categoryLabels } from '../../../shared/constants/categories';
import { getCategoryColor } from '../../../shared/theme/colors';
import { useFavoritesStore } from '../../../shared/stores/favoritesStore';
import { FavoriteType } from '../../../types';
import { Ionicons } from '@expo/vector-icons';

interface PlaceDetailScreenProps {
  route: { params: { placeId: string } };
  navigation: any;
}

export const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const { placeId } = route.params;
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(FavoriteType.PLACE, placeId);

  useEffect(() => {
    loadPlace();
  }, [placeId]);

  const loadPlace = async () => {
    try {
      setIsLoading(true);
      const repo = new PlaceRepository();
      const placeData = await repo.getById(placeId);
      setPlace(placeData);
    } catch (error) {
      console.error('Failed to load place:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async () => {
    await toggleFavorite(FavoriteType.PLACE, placeId);
  };

  const handleOpenMaps = () => {
    if (place) {
      const url = `https://maps.google.com/?q=${place.latitude},${place.longitude}`;
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open maps:', err)
      );
    }
  };

  if (isLoading || !place) {
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

  const categoryColor = getCategoryColor(place.category, theme.isDark);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        {place.images && place.images.length > 0 ? (
          <Image
            source={{ uri: place.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Ionicons name="image-outline" size={48} color={theme.colors.textTertiary} />
          </View>
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavorite}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={24}
            color={isFav ? theme.colors.favorite : '#FFFFFF'}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColor },
          ]}
        >
          <Text style={styles.categoryText}>
            {categoryLabels[place.category]}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.colors.text }]}
        >
          {place.name}
        </Text>

        {place.address && (
          <View style={styles.metaRow}>
            <Ionicons name="location" size={16} color={theme.colors.textSecondary} />
            <Text
              style={[styles.metaText, { color: theme.colors.textSecondary }]}
            >
              {place.address}
            </Text>
          </View>
        )}

        <View style={styles.metaRow}>
          {place.estimatedVisitDuration && (
            <>
              <Ionicons
                name="time-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {place.estimatedVisitDuration} minutes
              </Text>
            </>
          )}
          {place.priceRange && (
            <>
              <Ionicons
                name="cash-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {place.priceRange === 'free'
                  ? 'Free'
                  : place.priceRange.charAt(0).toUpperCase() +
                    place.priceRange.slice(1)}
              </Text>
            </>
          )}
        </View>

        <Text
          style={[
            styles.description,
            { color: theme.colors.text },
          ]}
        >
          {place.description}
        </Text>

        {place.practicalTips && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.text },
              ]}
            >
              Practical Tips
            </Text>
            <Text
              style={[
                styles.tipsText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {place.practicalTips}
            </Text>
          </View>
        )}

        {place.openingHours && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.text },
              ]}
            >
              Opening Hours
            </Text>
            <Text
              style={[
                styles.tipsText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Check locally for current hours
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.mapButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleOpenMaps}
        >
          <Ionicons name="map-outline" size={20} color="#FFFFFF" />
          <Text style={styles.mapButtonText}>Open in Maps</Text>
        </TouchableOpacity>
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
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
    marginBottom: 32,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

