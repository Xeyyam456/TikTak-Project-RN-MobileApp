import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

// Card-level styles live in OrderCard/OrderCard.styles.ts alongside the
// card and its skeleton — this file only covers the list shell.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingHorizontal: 15,
      paddingTop: 8,
    },
    cardGap: {
      height: 12,
    },
    emptyText: {
      marginTop: 32,
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
  });
