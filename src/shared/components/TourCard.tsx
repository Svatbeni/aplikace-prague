import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from './Card';
import { useTheme } from '../theme';
import { Tour } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../utils/imageHelper';

interface TourCardProps {
  tour: Tour;
  onPress: () => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onPress }) => {
  const theme = useTheme();

  return (
    <Card onPress={onPress} style={styles.card}>
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
            <Ionicons name="camera-outline" size={32} color={theme.colors.textTertiary} />
          </View>
        )}
        {tour.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{tour.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text },
          ]}
          numberOfLines={2}
        >
          {tour.title}
        </Text>
        <Text
          style={[
            styles.description,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={2}
        >
          {tour.shortDescription}
        </Text>

        <View style={styles.footer}>
          {tour.duration && (
            <View style={styles.meta}>
              <Ionicons
                name="time-outline"
                size={14}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: theme.colors.textTertiary },
                ]}
              >
                {tour.duration}
              </Text>
            </View>
          )}
          {tour.priceRange && (
            <View style={styles.meta}>
              <Ionicons
                name="cash-outline"
                size={14}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: theme.colors.textTertiary },
                ]}
              >
                {tour.priceRange}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
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
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
});
