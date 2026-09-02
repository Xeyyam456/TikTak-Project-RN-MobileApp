// Named color tokens for the most-repeated hex values across the app
// (brand green/red, white, and the handful of grays used for text/borders).
// Not exhaustive — screen-specific one-off accent colors (category/campaign
// card pastels) are left inline, same as before dark mode.
//
// LIGHT/DARK: keys must match between the two palettes — ThemeContext picks
// one object based on the system color scheme and everything downstream
// reads `colors.xxx`, never `COLORS.xxx` directly, so a screen never has to
// know which mode is active.
export type ThemeColors = {
  primary: string;
  primaryTint: string;
  danger: string;
  dangerTint: string;
  dangerLight: string;
  white: string;
  black: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  border: string;
  borderMuted: string;
  backgroundLight: string;
  placeholder: string;
  background: string;
  surface: string;
  overlay: string;
};

export const LIGHT_COLORS: ThemeColors = {
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
  // Screen/page background — was a bare '#FFFFFF' or '#FFF' literal at
  // nearly every screen's root View before dark mode.
  background: '#FFFFFF',
  // Card/sheet/input background — same literal as `background` in light
  // mode (that's why the two were never distinguished before dark mode),
  // but needs to sit one step lighter than `background` in dark mode so
  // cards remain visible against the page behind them.
  surface: '#FFFFFF',
  // Modal/bottom-sheet backdrop.
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const DARK_COLORS: ThemeColors = {
  primary: '#7BC043',
  primaryTint: '#7BC04340',
  danger: '#FF6B6B',
  dangerTint: '#FF6B6B33',
  dangerLight: '#3A2222',
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#F2F2F2',
  textSecondary: '#D0D0D0',
  textTertiary: '#A0A0A0',
  textMuted: '#8A8A8E',
  border: '#2C2C30',
  borderMuted: '#3A3A40',
  backgroundLight: '#161618',
  placeholder: '#6B6B72',
  background: '#121214',
  surface: '#1E1E20',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

// Kept for the handful of call sites that aren't theme-aware yet (e.g.
// files reached during the dark-mode rollout that still import COLORS
// directly) — always resolves to the light palette, so don't add new
// usages of this once a file has been converted to useTheme().
export const COLORS = LIGHT_COLORS;
