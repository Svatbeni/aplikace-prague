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
import { HotelRepository } from '../../../shared/repositories/HotelRepository';
import { Hotel } from '../../../types';
import { useFavoritesStore } from '../../../shared/stores/favoritesStore';
import { FavoriteType } from '../../../types';
import { Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../../../shared/utils/imageHelper';

interface HotelDetailScreenProps {
  route: { params: { hotelId: string } };
  navigation: any;
}

export const HotelDetailScreen: React.FC<HotelDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const { hotelId } = route.params;
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(FavoriteType.HOTEL, hotelId);

  useEffect(() => {
    loadHotel();
  }, [hotelId]);

  const loadHotel = async () => {
    try {
      setIsLoading(true);
      const repo = new HotelRepository();
      const hotelData = await repo.getById(hotelId);
      setHotel(hotelData);
    } catch (error) {
      console.error('Failed to load hotel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async () => {
    await toggleFavorite(FavoriteType.HOTEL, hotelId);
  };

  const handleCheckAvailability = () => {
    if (hotel) {
      Linking.openURL(hotel.affiliateLink).catch((err) =>
        console.error('Failed to open link:', err)
      );
    }
  };

  if (isLoading || !hotel) {
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
        {hotel.imageUrl ? (
          <Image
            source={
              hotel.imageUrl.startsWith('http') || hotel.imageUrl.startsWith('https')
                ? { uri: hotel.imageUrl }
                : getImageSource(hotel.imageUrl)
            }
            style={styles.image}
            resizeMode="cover"
            onError={(error) => {
              console.error('Image load error:', error.nativeEvent.error, 'for image:', hotel.imageUrl);
            }}
          />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Ionicons name="bed-outline" size={48} color={theme.colors.textTertiary} />
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
        {hotel.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{hotel.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: theme.colors.text }]}
        >
          {hotel.name}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons
            name="location"
            size={16}
            color={theme.colors.textSecondary}
          />
          <Text
            style={[
              styles.metaText,
              { color: theme.colors.textSecondary },
            ]}
          >
            {hotel.area}
          </Text>
        </View>

        {hotel.priceRange && (
          <View style={styles.metaRow}>
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
              {hotel.priceRange}
            </Text>
          </View>
        )}

        {hotel.description && (
          <Text
            style={[
              styles.description,
              { color: theme.colors.text },
            ]}
          >
            {hotel.description}
          </Text>
        )}

        {hotel.features && hotel.features.length > 0 && (
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.text },
              ]}
            >
              Features
            </Text>
            <View style={styles.featuresContainer}>
              {hotel.features.map((feature, index) => (
                <View key={index} style={styles.featureTag}>
                  <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.checkAvailabilityButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={handleCheckAvailability}
        >
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.checkAvailabilityButtonText}>Check Availability</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  featureText: {
    fontSize: 14,
  },
  checkAvailabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
    marginBottom: 32,
  },
  checkAvailabilityButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
