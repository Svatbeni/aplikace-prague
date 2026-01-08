import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();

  const buttonStyle = [
    styles.button,
    {
      backgroundColor:
        variant === 'primary'
          ? theme.colors.primary
          : variant === 'secondary'
          ? 'transparent'
          : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: theme.colors.primary,
      opacity: disabled || loading ? 0.6 : 1,
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color:
        variant === 'primary'
          ? '#FFFFFF'
          : variant === 'secondary'
          ? theme.colors.primary
          : theme.colors.primary,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : theme.colors.primary}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    textAlign: 'center',
  },
});

