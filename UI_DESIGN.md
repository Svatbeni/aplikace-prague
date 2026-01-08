# UI Design Principles

## Design System

### Color Palette

#### Light Theme
```typescript
{
  primary: '#1E88E5',           // Blue - primary actions
  primaryDark: '#1565C0',       // Darker blue for hover/pressed
  secondary: '#FF6F00',         // Orange accent
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
  
  // Category colors
  sightseeing: '#2196F3',
  hiddenGems: '#9C27B0',
  food: '#FF9800',
  nature: '#4CAF50',
  viewpoints: '#F44336',
  
  // Status colors
  favorite: '#E91E63',
  premium: '#FFD700',
}
```

#### Dark Theme
```typescript
{
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
  
  // Category colors (adjusted for dark)
  sightseeing: '#42A5F5',
  hiddenGems: '#BA68C8',
  food: '#FFB74D',
  nature: '#81C784',
  viewpoints: '#EF5350',
  
  favorite: '#F48FB1',
  premium: '#FFD54F',
}
```

### Typography

```typescript
{
  // Font families
  fontFamily: {
    regular: 'System',           // iOS: SF Pro, Android: Roboto
    medium: 'System',
    bold: 'System',
    // Optionally: 'Inter', 'Poppins' for custom fonts
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
}
```

### Spacing Scale

```typescript
{
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  // Shadows (elevation)
  elevation: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16,
  },
}
```

### Component Styles

#### Cards
- Rounded corners: 12px
- Shadow/elevation: Medium (4-8px)
- Padding: 16px
- Background: Surface color

#### Buttons
- Primary: Primary color background, white text
- Secondary: Outlined, primary color border
- Text: Primary color text, no background
- Height: 48px minimum
- Border radius: 8px
- Touch feedback: Opacity change or ripple

#### Inputs
- Border: 1px solid border color
- Border radius: 8px
- Padding: 12px 16px
- Height: 48px
- Focus: Primary color border

#### Map Markers
- Custom styled markers with category colors
- Shadow for depth
- Size: 40px diameter

### Layout Principles

1. **Safe Areas**: Respect safe area insets on all screens
2. **Consistent Padding**: 16px horizontal padding on screens
3. **Card Spacing**: 12px vertical spacing between cards
4. **Section Headers**: 24px top margin, 16px bottom margin
5. **Tab Bar Height**: 60px (with safe area)
6. **Header Height**: 56px + status bar

### Accessibility

- Minimum touch target: 44x44px (iOS), 48x48px (Android)
- Contrast ratios: WCAG AA compliant (4.5:1 for normal text)
- Font scaling: Support dynamic type sizes
- Screen readers: Proper accessibility labels
- Color blindness: Don't rely solely on color for information

### Animation Guidelines

- Standard transitions: 200-300ms
- Spring animations for interactive elements
- Haptic feedback: Subtle feedback on important actions
- Loading states: Skeleton screens or spinners
- Pull-to-refresh: Standard OS patterns

### Icon Guidelines

- Size: 24px default, 16px small, 32px large
- Stroke width: 1.5-2px
- Style: Outlined (not filled) for consistency
- Source: Material Icons or custom SVG set

### Image Guidelines

- Place images: 16:9 aspect ratio
- Placeholder: Blur hash or gradient
- Loading: Progressive loading with blur-up
- Caching: All images cached offline

