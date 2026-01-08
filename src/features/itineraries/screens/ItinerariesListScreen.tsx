import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Icon } from '@expo/vector-icons';

export const ItinerariesListScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.centerContent}>
        <Icon name="route" size={64} color={theme.colors.textTertiary} />
        <Text
          style={[
            styles.text,
            { color: theme.colors.textSecondary },
          ]}
        >
          Itineraries coming soon
        </Text>
        <Text
          style={[
            styles.subtext,
            { color: theme.colors.textTertiary },
          ]}
        >
          Predefined routes for 1-3 day visits
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  text: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
  },
  subtext: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});

