import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from './Card';
import { useTheme } from '../theme';
import { Place } from '../../types';
import { categoryLabels } from '../constants/categories';
import { getCategoryColor } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  const theme = useTheme();
  const categoryColor = getCategoryColor(place.category, theme.isDark);

  return (
    <Card onPress={onPress} style={styles.card}>
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
            <Ionicons name="image-outline" size={32} color={theme.colors.textTertiary} />
          </View>
        )}
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
        {place.isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={16} color={theme.colors.premium} />
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
          {place.name}
        </Text>
        <Text
          style={[
            styles.description,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={2}
        >
          {place.shortDescription}
        </Text>

        <View style={styles.footer}>
          {place.estimatedVisitDuration && (
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
                {place.estimatedVisitDuration} min
              </Text>
            </View>
          )}
          {place.priceRange && place.priceRange !== 'free' && (
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
                {place.priceRange}
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
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
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

