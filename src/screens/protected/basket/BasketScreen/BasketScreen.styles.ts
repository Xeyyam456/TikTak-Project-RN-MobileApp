import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

// Row, empty-state and footer styles live with their own components in
// BasketRow/, BasketEmptyState/ and BasketFooter/ — this file only covers
// the screen shell.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 32,
    },
    clearRow: {
      paddingHorizontal: 15,
      paddingTop: 8,
      alignItems: 'flex-end',
    },
    clearText: {
      fontSize: 13,
      color: colors.danger,
      fontFamily: FONTS.medium,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 15,
      paddingTop: 8,
    },
  });
