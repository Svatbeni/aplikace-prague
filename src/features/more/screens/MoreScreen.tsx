import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../shared/theme/spacing';

interface MoreScreenProps {
  navigation: any;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handlePracticalTipsPress = () => {
    navigation.navigate('PracticalTips');
  };

  const handleAboutUsPress = () => {
    navigation.navigate('AboutUs');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            styles.menuItem,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handlePracticalTipsPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primary + '20' },
              ]}
            >
              <Ionicons
                name="information-circle"
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.menuItemText}>
              <Text style={[styles.menuItemTitle, { color: theme.colors.text }]}>
                Practical Tips
              </Text>
              <Text
                style={[styles.menuItemSubtitle, { color: theme.colors.textSecondary }]}
              >
                Essential information for your visit
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.textTertiary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={handleAboutUsPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primary + '20' },
              ]}
            >
              <Ionicons
                name="people"
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.menuItemText}>
              <Text style={[styles.menuItemTitle, { color: theme.colors.text }]}>
                About Us
              </Text>
              <Text
                style={[styles.menuItemSubtitle, { color: theme.colors.textSecondary }]}
              >
                Meet Adriana and Matěj
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.textTertiary}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
});

