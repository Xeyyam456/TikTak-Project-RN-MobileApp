import { createMMKV } from 'react-native-mmkv';

// User-facing app preferences (dark mode, language) — separate from
// tokenStorage.ts's encrypted instance (not sensitive) and from
// queryStorage.ts's cache instance (this survives a logout/queryClient.clear(),
// preferences shouldn't reset just because the user signed out).
const storage = createMMKV({ id: 'tiktak-settings' });

const DARK_MODE_KEY = 'tiktak_dark_mode_enabled';
const LANGUAGE_KEY = 'tiktak_language';

export type Language = 'az' | 'en' | 'ru';

export function getDarkModeEnabled(systemPrefersDark: boolean): boolean {
  const stored = storage.getBoolean(DARK_MODE_KEY);
  // First launch (nothing stored yet): default to the system's own
  // preference so the checkbox starts in a sensible state instead of
  // always defaulting to light; every toggle after that is a manual
  // override that no longer tracks system changes.
  return stored ?? systemPrefersDark;
}

// Distinguishes "no manual choice ever made" from "explicitly set to
// false" — getDarkModeEnabled() can't tell those apart on its own since
// both cases need a boolean. ThemeContext uses this to decide whether a
// live OS theme change (device flipped to dark while the app is already
// open) should update the app's theme, or whether a manual in-app
// override should keep winning.
export function hasDarkModeOverride(): boolean {
  return storage.contains(DARK_MODE_KEY);
}

export function setDarkModeEnabled(enabled: boolean): void {
  storage.set(DARK_MODE_KEY, enabled);
}

// Undoes setDarkModeEnabled() — lets the app go back to following the OS
// theme live instead of being stuck on whatever was last manually chosen.
// Wired to a long-press on SettingsScreen's switch (see ThemeContext's
// resetDarkModeToSystem()), since there's otherwise no way back to
// "system" once the switch has been tapped even once.
export function resetDarkModeOverride(): void {
  storage.remove(DARK_MODE_KEY);
}

export function getLanguage(): Language {
  return (storage.getString(LANGUAGE_KEY) as Language | undefined) ?? 'az';
}

export function setLanguage(language: Language): void {
  storage.set(LANGUAGE_KEY, language);
}
