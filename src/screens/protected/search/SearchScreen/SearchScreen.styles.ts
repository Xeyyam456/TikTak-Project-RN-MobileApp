import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';
import { HORIZONTAL_PADDING } from '../SearchResultRow';

// Row, skeleton and history styles live with their own components.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchBox: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 14,
    },
    emptyText: {
      marginTop: 32,
      paddingHorizontal: HORIZONTAL_PADDING,
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
    resultsList: {
      flex: 1,
    },
    results: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 18,
      gap: 18,
    },
  });
