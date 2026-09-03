import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppState, Appearance, useColorScheme } from 'react-native';
import { DARK_COLORS, LIGHT_COLORS, type ThemeColors } from './colors';
import {
  getDarkModeEnabled,
  hasDarkModeOverride,
  resetDarkModeOverride,
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
  // Undoes the manual override above and snaps back to whatever the OS
  // theme currently is — the only way back to "follow system" once the
  // switch has been touched (see SettingsScreen's long-press on it).
  resetDarkModeToSystem: () => void;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const [isDark, setIsDark] = useState(() => getDarkModeEnabled(scheme === 'dark'));

  // useColorScheme() re-renders this component when the OS theme changes
  // while the app is already open (e.g. the user flips their device into
  // dark mode from quick settings), but a useState initializer only runs
  // once at mount — without this effect, isDark would stay stuck at
  // whatever it was on launch. Only follow the live change if the user
  // hasn't set a manual in-app override (SettingsScreen's switch); once
  // they have, that choice keeps winning regardless of OS changes.
  useEffect(() => {
    if (hasDarkModeOverride()) return;
    setIsDark(scheme === 'dark');
  }, [scheme]);

  // Belt-and-suspenders for the effect above: confirmed on-device (real
  // Xiaomi/MIUI hardware, not just the emulator) that useColorScheme()'s
  // live change event fires reliably for the *first* in-foreground OS
  // theme flip but can silently stop firing for a second one in the same
  // app session — flipping the device back to light left the app stuck
  // on dark. AppState's 'active' transition is a more reliable signal:
  // it fires whenever the app regains foreground (e.g. after visiting the
  // quick-settings dark-mode tile and returning), and by then the OS has
  // already recomputed Appearance.getColorScheme(), so re-reading it
  // directly here catches whatever the live listener missed.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state !== 'active' || hasDarkModeOverride()) return;
      setIsDark(Appearance.getColorScheme() === 'dark');
    });
    return () => subscription.remove();
  }, []);

  function setDarkModeEnabled(enabled: boolean) {
    persistDarkModeEnabled(enabled);
    setIsDark(enabled);
  }

  function resetDarkModeToSystem() {
    resetDarkModeOverride();
    setIsDark(Appearance.getColorScheme() === 'dark');
  }

  const value = useMemo<Theme>(
    () => ({
      colors: isDark ? DARK_COLORS : LIGHT_COLORS,
      isDark,
      setDarkModeEnabled,
      resetDarkModeToSystem,
    }),
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
