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
import { TourRepository } from '../../../shared/repositories/TourRepository';
import { Tour } from '../../../types';
import { useFavoritesStore } from '../../../shared/stores/favoritesStore';
import { FavoriteType } from '../../../types';
import { Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../../../shared/utils/imageHelper';

interface TourDetailScreenProps {
  route: { params: { tourId: string } };
  navigation: any;
}

export const TourDetailScreen: React.FC<TourDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const { tourId } = route.params;
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(FavoriteType.TOUR, tourId);

  useEffect(() => {
    loadTour();
  }, [tourId]);

  const loadTour = async () => {
    try {
      setIsLoading(true);
      const repo = new TourRepository();
      const tourData = await repo.getById(tourId);
      setTour(tourData);
    } catch (error) {
      console.error('Failed to load tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async () => {
    await toggleFavorite(FavoriteType.TOUR, tourId);
  };

  const handleCheckPrice = () => {
    if (tour) {
      Linking.openURL(tour.affiliateLink).catch((err) =>
        console.error('Failed to open link:', err)
      );
    }
  };

  if (isLoading || !tour) {
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
      {/* Image */}
      <View style={styles.imageContainer}>
        {tour.imageUrl ? (
          <Image
            source={
              tour.imageUrl.startsWith('http') || tour.imageUrl.startsWith('https')
                ? { uri: tour.imageUrl }
                : getImageSource(tour.imageUrl)
            }
            style={styles.image}
            resizeMode="cover"
            onError={(error) => {
              console.error('Image load error:', error.nativeEvent.error, 'for image:', tour.imageUrl);
            }}
          />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Ionicons name="camera-outline" size={48} color={theme.colors.textTertiary} />
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
        {tour.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{tour.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.colors.text }]}
        >
          {tour.title}
        </Text>

        <View style={styles.metaRow}>
          {tour.duration && (
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
                {tour.duration}
              </Text>
            </>
          )}
          {tour.priceRange && (
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
                {tour.priceRange}
              </Text>
            </>
          )}
        </View>

        {tour.provider && (
          <View style={styles.metaRow}>
            <Ionicons
              name="business-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.metaText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {tour.provider}
            </Text>
          </View>
        )}

        {tour.description && (
          <Text
            style={[
              styles.description,
              { color: theme.colors.text },
            ]}
          >
            {tour.description}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.checkPriceButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleCheckPrice}
        >
          <Ionicons name="link-outline" size={20} color="#FFFFFF" />
          <Text style={styles.checkPriceButtonText}>Check Price</Text>
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
  ratingBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
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
  checkPriceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
    marginBottom: 32,
  },
  checkPriceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
