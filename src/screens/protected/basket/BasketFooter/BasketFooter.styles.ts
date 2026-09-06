import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 15,
      paddingTop: 16,
      backgroundColor: colors.surface,
      zIndex: 1,
    },
    footerDivider: {
      height: 1,
      backgroundColor: colors.backgroundLight,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
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
    checkoutButton: {
      backgroundColor: colors.primary,
    },
  });
