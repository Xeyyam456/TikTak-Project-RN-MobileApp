import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { DARK_COLORS, LIGHT_COLORS, type ThemeColors } from './colors';
import {
  getDarkModeEnabled,
  setDarkModeEnabled as persistDarkModeEnabled,
} from '../shared/api/settingsStorage';

type Theme = {
  colors: ThemeColors;
  isDark: boolean;
  // Settings screen's checkbox reads/writes this directly — a manual
  // on/off, not a 3-way system/light/dark picker. Once the user has
  // touched it, it no longer tracks system theme changes (see
  // settingsStorage.getDarkModeEnabled's first-launch-only fallback).
  setDarkModeEnabled: (enabled: boolean) => void;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const [isDark, setIsDark] = useState(() => getDarkModeEnabled(scheme === 'dark'));

  function setDarkModeEnabled(enabled: boolean) {
    persistDarkModeEnabled(enabled);
    setIsDark(enabled);
  }

  const value = useMemo<Theme>(
    () => ({ colors: isDark ? DARK_COLORS : LIGHT_COLORS, isDark, setDarkModeEnabled }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme() called outside <ThemeProvider>');
  }
  return theme;
}
