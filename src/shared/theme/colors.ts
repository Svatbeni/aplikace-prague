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
  sightseeing: '#2196F3',
  hiddenGems: '#9C27B0',
  food: '#FF9800',
  nature: '#4CAF50',
  viewpoints: '#F44336',
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
  sightseeing: '#42A5F5',
  hiddenGems: '#BA68C8',
  food: '#FFB74D',
  nature: '#81C784',
  viewpoints: '#EF5350',
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
    case 'food':
      return colors.food;
    case 'nature':
      return colors.nature;
    case 'viewpoints':
      return colors.viewpoints;
    default:
      return colors.primary;
  }
};

