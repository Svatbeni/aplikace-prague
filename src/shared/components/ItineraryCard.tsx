import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { useTheme } from '../theme';
import { Itinerary, ItineraryType, Difficulty } from '../../types';
import { Ionicons } from '@expo/vector-icons';

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

const getDifficultyColor = (difficulty: Difficulty | undefined, isDark: boolean): string => {
  if (!difficulty) return isDark ? '#42A5F5' : '#1E88E5';
  
  const colors = isDark ? {
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

const getDifficultyLabel = (difficulty: Difficulty | undefined): string => {
  if (!difficulty) return '';
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

interface ItineraryCardProps {
  itinerary: Itinerary;
  onPress: () => void;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary, onPress }) => {
  const theme = useTheme();
  const difficultyColor = getDifficultyColor(itinerary.difficulty, theme.isDark);
  const typeLabel = getItineraryTypeLabel(itinerary.type);
  const placesCount = itinerary.places.length;

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

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Ionicons name="map-outline" size={14} color="#FFFFFF" />
            <Text style={styles.typeText}>{typeLabel}</Text>
          </View>
          {itinerary.difficulty && (
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: difficultyColor },
              ]}
            >
              <Text style={styles.difficultyText}>
                {getDifficultyLabel(itinerary.difficulty)}
              </Text>
            </View>
          )}
        </View>
        {itinerary.isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.premiumText}>Premium</Text>
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
          {itinerary.title}
        </Text>
        <Text
          style={[
            styles.description,
            { color: theme.colors.textSecondary },
          ]}
          numberOfLines={3}
        >
          {itinerary.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Ionicons
              name="location-outline"
              size={14}
              color={theme.colors.textTertiary}
            />
            <Text
              style={[
                styles.metaText,
                { color: theme.colors.textTertiary },
              ]}
            >
              {placesCount} {placesCount === 1 ? 'place' : 'places'}
            </Text>
          </View>
          {itinerary.estimatedDuration > 0 && (
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
                {formatDuration(itinerary.estimatedDuration)}
              </Text>
            </View>
          )}
          {itinerary.walkingDistance && (
            <View style={styles.meta}>
              <Ionicons
                name="walk-outline"
                size={14}
                color={theme.colors.textTertiary}
              />
              <Text
                style={[
                  styles.metaText,
                  { color: theme.colors.textTertiary },
                ]}
              >
                {itinerary.walkingDistance.toFixed(1)} km
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  premiumText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
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
