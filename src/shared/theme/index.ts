import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, elevation } from './spacing';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    borderRadius,
    elevation,
    isDark,
  };
};

export type Theme = ReturnType<typeof useTheme>;

