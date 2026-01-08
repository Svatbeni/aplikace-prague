import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from './Card';
import { useTheme } from '../theme';
import { Hotel } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../utils/imageHelper';

const getAreaColor = (area: string, isDark: boolean): string => {
  const colors = isDark ? {
    'Old Town': '#42A5F5',
    'New Town': '#BA68C8',
    'Lesser Town': '#81C784',
    'Prague Castle': '#EF5350',
    'Vinohrady': '#FFB74D',
  } : {
    'Old Town': '#2196F3',
    'New Town': '#9C27B0',
    'Lesser Town': '#4CAF50',
    'Prague Castle': '#F44336',
    'Vinohrady': '#FF9800',
  };

  return colors[area as keyof typeof colors] || (isDark ? '#42A5F5' : '#1E88E5');
};

interface HotelCardProps {
  hotel: Hotel;
  onPress: () => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onPress }) => {
  const theme = useTheme();
  const areaColor = getAreaColor(hotel.area, theme.isDark);

  return (
    <Card onPress={onPress} style={styles.card}>
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
            <Ionicons name="bed-outline" size={32} color={theme.colors.textTertiary} />
          </View>
        )}
        <View
          style={[
            styles.areaBadge,
            { backgroundColor: areaColor },
          ]}
        >
          <Text style={styles.areaText}>
            {hotel.area}
          </Text>
        </View>
        {hotel.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{hotel.rating.toFixed(1)}</Text>
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
          {hotel.name}
        </Text>
        <Text
          style={[
            styles.description,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={2}
        >
          {hotel.description}
        </Text>

        <View style={styles.footer}>
          {hotel.priceRange && (
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
                {hotel.priceRange}
              </Text>
            </View>
          )}
          {hotel.features && hotel.features.length > 0 && (
            <View style={styles.meta}>
              <Ionicons
                name="star-outline"
                size={14}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: theme.colors.textTertiary },
                ]}
              >
                {hotel.features.length} features
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
  areaBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  areaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
