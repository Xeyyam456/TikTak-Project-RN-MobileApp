import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import type { ThemeColors } from './colors';

// React Navigation paints screen backgrounds, headers and card surfaces from
// its own palette, so it has to be handed our tokens too — otherwise a
// theme switch leaves navigation-owned surfaces on the stock colours.
export function buildNavigationTheme(
  isDark: boolean,
  colors: ThemeColors,
): NavigationTheme {
  const base = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.surface,
      border: colors.border,
      text: colors.textPrimary,
      primary: colors.primary,
    },
  };
}
