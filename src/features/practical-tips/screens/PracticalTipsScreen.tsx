import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/theme';
import { TipRepository } from '../../../shared/repositories/TipRepository';
import { PracticalTip, TipCategory } from '../../../types';

interface PracticalTipsScreenProps {
  navigation: any;
}

const categoryLabels: Record<TipCategory, string> = {
  [TipCategory.TRANSPORT]: 'Transport',
  [TipCategory.MONEY]: 'Money',
  [TipCategory.SAFETY]: 'Safety',
  [TipCategory.EMERGENCY]: 'Emergency',
  [TipCategory.TIPPING]: 'Tipping',
  [TipCategory.INTERNET]: 'Internet',
  [TipCategory.GENERAL]: 'General',
};

const categoryIcons: Record<TipCategory, string> = {
  [TipCategory.TRANSPORT]: 'car',
  [TipCategory.MONEY]: 'cash',
  [TipCategory.SAFETY]: 'shield-checkmark',
  [TipCategory.EMERGENCY]: 'call',
  [TipCategory.TIPPING]: 'card',
  [TipCategory.INTERNET]: 'wifi',
  [TipCategory.GENERAL]: 'information-circle',
};

export const PracticalTipsScreen: React.FC<PracticalTipsScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [tips, setTips] = useState<PracticalTip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TipCategory | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      setIsLoading(true);
      const repo = new TipRepository();
      const allTips = await repo.getAll();
      setTips(allTips);
    } catch (error) {
      console.error('Failed to load tips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTips = selectedCategory
    ? tips.filter((tip) => tip.category === selectedCategory)
    : tips;

  const groupedTips = filteredTips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<TipCategory, PracticalTip[]>);

  const toggleTip = (tipId: string) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(tipId)) {
      newExpanded.delete(tipId);
    } else {
      newExpanded.add(tipId);
    }
    setExpandedTips(newExpanded);
  };

  const categories: (TipCategory | null)[] = [
    null,
    TipCategory.TRANSPORT,
    TipCategory.MONEY,
    TipCategory.SAFETY,
    TipCategory.EMERGENCY,
    TipCategory.TIPPING,
    TipCategory.INTERNET,
    TipCategory.GENERAL,
  ];

  const renderCategoryFilter = () => (
    <View style={[styles.categoryContainer, { borderBottomColor: theme.colors.border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category || 'all'}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color: isSelected ? '#FFFFFF' : theme.colors.text,
                  },
                ]}
              >
                {category ? categoryLabels[category] : 'All'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderTipCard = (tip: PracticalTip) => {
    const isExpanded = expandedTips.has(tip.id);
    const iconName = tip.icon || categoryIcons[tip.category] || 'information-circle';

    return (
      <TouchableOpacity
        key={tip.id}
        style={[
          styles.tipCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => toggleTip(tip.id)}
        activeOpacity={0.7}
      >
        <View style={styles.tipHeader}>
          <View style={styles.tipHeaderLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primary + '20' },
              ]}
            >
              <Ionicons
                name={iconName as any}
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.tipTitleContainer}>
              <Text
                style={[styles.tipTitle, { color: theme.colors.text }]}
                numberOfLines={isExpanded ? undefined : 2}
              >
                {tip.title}
              </Text>
              <Text
                style={[styles.tipCategory, { color: theme.colors.textSecondary }]}
              >
                {categoryLabels[tip.category]}
              </Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={theme.colors.textTertiary}
          />
        </View>
        {isExpanded && (
          <View style={styles.tipContent}>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              {tip.content}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
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
          style={[styles.loadingText, { color: theme.colors.textSecondary }]}
        >
          Loading tips...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {renderCategoryFilter()}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(groupedTips).length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="information-circle-outline"
              size={48}
              color={theme.colors.textTertiary}
            />
            <Text
              style={[styles.emptyText, { color: theme.colors.textSecondary }]}
            >
              No tips found
            </Text>
          </View>
        ) : (
          Object.entries(groupedTips).map(([category, categoryTips]) => (
            <View key={category} style={styles.categorySection}>
              {!selectedCategory && (
                <View style={styles.categoryHeader}>
                  <Ionicons
                    name={categoryIcons[category as TipCategory] as any}
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={[
                      styles.categoryTitle,
                      { color: theme.colors.text },
                    ]}
                  >
                    {categoryLabels[category as TipCategory]}
                  </Text>
                </View>
              )}
              {categoryTips.map(renderTipCard)}
            </View>
          ))
        )}
      </ScrollView>
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
  categoryContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  tipCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitleContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipCategory: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
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
