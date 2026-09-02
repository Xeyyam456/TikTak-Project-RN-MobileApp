// Named color tokens for the most-repeated hex values across the app
// (brand green/red, white, and the handful of grays used for text/borders).
// Not exhaustive — screen-specific one-off accent colors are left inline.
export const COLORS = {
  primary: '#7BC043',
  primaryTint: '#7BC04326',
  danger: '#E24C4C',
  dangerTint: '#E24C4C26',
  dangerLight: '#FBE6E6',
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#1A1A1A',
  textSecondary: '#333333',
  textTertiary: '#6B6B6B',
  textMuted: '#9B9B9B',
  border: '#F1F0F7',
  borderMuted: '#C4C4CE',
  backgroundLight: '#EFEFEF',
  placeholder: '#B8B8C2',
} as const;
