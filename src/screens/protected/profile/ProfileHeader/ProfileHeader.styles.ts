import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    name: {
      marginTop: 16,
      fontSize: 17,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
    },
    phone: {
      marginTop: 4,
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
  });
