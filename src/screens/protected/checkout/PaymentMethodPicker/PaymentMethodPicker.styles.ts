import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
  });
