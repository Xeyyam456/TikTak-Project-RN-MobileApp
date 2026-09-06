import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../../theme/colors';

// Chips live in CategoryChipsRow/, the back button in
// BackToCategoriesButton/, grid layout in the shared ProductGrid/ — this
// file only covers the screen shell.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list: {
      marginTop: 14,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: 'hidden',
    },
  });
