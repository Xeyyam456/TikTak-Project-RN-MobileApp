export type ThemeSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  // Optional: SettingsScreen wires this to "reset to system theme" — a
  // long-press is a deliberate, hard-to-trigger-by-accident gesture for an
  // action that has no other visible affordance (see ThemeContext's
  // resetDarkModeToSystem()).
  onLongPress?: () => void;
};
