import { ColorSchemeName } from 'react-native';

export const lightColors = {
  primary: '#1E88E5',
  primaryDark: '#1565C0',
  secondary: '#FF6F00',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceVariant: '#FAFAFA',
  text: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  border: '#E0E0E0',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#0288D1',
  sightseeing: '#F44336', // red
  hiddenGems: '#1565C0', // darker blue
  bizarre: '#9C27B0', // purple
  food: '#FFC107', // yellow
  parks: '#2E7D32', // darker green
  culture: '#795548', // brown
  viewpoints: '#64B5F6', // lighter blue
  nightlife: '#FF9800', // orange
  kids: '#E91E63', // pink
  favorite: '#E91E63',
  premium: '#FFD700',
};

export const darkColors = {
  primary: '#42A5F5',
  primaryDark: '#1E88E5',
  secondary: '#FF9800',
  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2C2C2C',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  border: '#333333',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  info: '#42A5F5',
  sightseeing: '#EF5350', // red
  hiddenGems: '#1976D2', // darker blue
  bizarre: '#BA68C8', // purple
  food: '#FFD54F', // yellow
  parks: '#66BB6A', // darker green
  culture: '#A1887F', // brown
  viewpoints: '#81D4FA', // lighter blue
  nightlife: '#FFB74D', // orange
  kids: '#F48FB1', // pink
  favorite: '#F48FB1',
  premium: '#FFD54F',
};

export const getCategoryColor = (category: string, isDark: boolean): string => {
  const colors = isDark ? darkColors : lightColors;
  switch (category) {
    case 'sightseeing':
      return colors.sightseeing;
    case 'hidden_gems':
      return colors.hiddenGems;
    case 'bizarre':
      return colors.bizarre;
    case 'viewpoints':
      return colors.viewpoints;
    case 'parks':
      return colors.parks;
    case 'culture':
      return colors.culture;
    case 'food':
      return colors.food;
    case 'nightlife':
      return colors.nightlife;
    case 'kids':
      return colors.kids;
    default:
      return colors.primary;
  }
};

