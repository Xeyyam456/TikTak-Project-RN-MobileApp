import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 32,
    },
    formSection: {
      paddingHorizontal: 15,
      paddingTop: 8,
      gap: 20,
    },
    field: {
      gap: 6,
    },
    fieldLabel: {
      fontSize: 15,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    fieldValue: {
      fontSize: 14,
      color: colors.textTertiary,
      fontFamily: FONTS.regular,
    },
    noteInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    paymentOptions: {
      gap: 16,
    },
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: colors.borderMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioSelected: {
      borderColor: colors.primary,
    },
    radioDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
    },
    paymentLabel: {
      fontSize: 15,
      color: colors.textPrimary,
      fontFamily: FONTS.medium,
    },
    footer: {
      paddingHorizontal: 15,
      paddingTop: 16,
      backgroundColor: colors.surface,
      gap: 16,
    },
    formError: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.danger,
      fontFamily: FONTS.regular,
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
  });
