import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ItineraryCard } from '../../../shared/components/ItineraryCard';
import { useTheme } from '../../../shared/theme';
import { ItineraryRepository } from '../../../shared/repositories/ItineraryRepository';
import { Itinerary } from '../../../types';
import { Ionicons } from '@expo/vector-icons';

export const ItinerariesListScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItineraries();
  }, []);

  const loadItineraries = async () => {
    try {
      setIsLoading(true);
      const repo = new ItineraryRepository();
      const allItineraries = await repo.getAll();
      setItineraries(allItineraries);
    } catch (error) {
      console.error('Failed to load itineraries:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          Loading itineraries...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={itineraries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItineraryCard
            itinerary={item}
            onPress={() => {
              navigation.navigate('ItineraryDetail', { itineraryId: item.id });
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="map-outline" size={48} color={theme.colors.textTertiary} />
            <Text
              style={[
                styles.emptyText,
                { color: theme.colors.textSecondary },
              ]}
            >
              No itineraries found
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

