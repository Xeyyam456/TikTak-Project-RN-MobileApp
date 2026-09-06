import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    footer: {
      paddingHorizontal: 15,
      paddingTop: 16,
      backgroundColor: colors.surface,
      gap: 16,
    },
    footerDivider: {
      height: 1,
      backgroundColor: colors.backgroundLight,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    summaryLabel: {
      fontSize: 13,
      lineHeight: 20,
      color: colors.textTertiary,
      fontFamily: FONTS.regular,
    },
    summaryTotalWrapper: {
      alignItems: 'flex-end',
    },
    summaryTotalLabel: {
      fontSize: 13,
      lineHeight: 20,
      color: colors.textPrimary,
      fontFamily: FONTS.semiBold,
    },
    summaryTotalValue: {
      fontSize: 15,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    formError: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.danger,
      fontFamily: FONTS.regular,
    },
  });
