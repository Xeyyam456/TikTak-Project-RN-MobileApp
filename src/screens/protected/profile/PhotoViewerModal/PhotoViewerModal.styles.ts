import { StyleSheet } from 'react-native';

// Deliberately static, not a createStyles(colors) factory: the scrim is a
// translucent black on purpose in both themes (same reasoning as shadowColor)
// and nothing else here takes a theme colour.
export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  image: {
    width: '100%',
    height: '80%',
  },
});
