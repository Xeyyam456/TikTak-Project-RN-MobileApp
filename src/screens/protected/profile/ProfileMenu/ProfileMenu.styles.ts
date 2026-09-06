import { StyleSheet } from 'react-native';

// Deliberately static, not a createStyles(colors) factory: this wrapper is
// layout-only and every colour on the menu comes from MenuRow itself, so
// there is nothing here that has to react to a theme change.
export const styles = StyleSheet.create({
  menu: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
