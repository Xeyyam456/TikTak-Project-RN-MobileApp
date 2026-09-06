import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
  });
