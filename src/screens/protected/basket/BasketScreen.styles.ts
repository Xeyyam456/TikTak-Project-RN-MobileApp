import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 32,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyStateIconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    emptyStateText: {
      fontSize: 14,
      color: colors.placeholder,
      fontFamily: FONTS.medium,
      textAlign: 'center',
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      gap: 12,
    },
    rowImage: {
      width: 56,
      height: 56,
      borderRadius: 12,
    },
    rowInfo: {
      flex: 1,
      gap: 4,
    },
    rowTitle: {
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: FONTS.semiBold,
    },
    rowPrice: {
      fontSize: 13,
      color: colors.textTertiary,
      fontFamily: FONTS.regular,
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 6,
    },
    // White text/backgrounds below sit on top of the green `stepper`
    // background above, in both themes — not themed on purpose, same as
    // Button.tsx's white spinner/title on its colored button background.
    stepperButton: {
      width: 26,
      height: 26,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperButtonText: {
      fontSize: 20,
      lineHeight: 22,
      color: '#FFFFFF',
      fontFamily: FONTS.bold,
    },
    stepperQuantity: {
      width: 22,
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: FONTS.semiBold,
      textAlign: 'center',
    },
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
