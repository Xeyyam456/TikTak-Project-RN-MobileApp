import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors.danger,
    },
    errorText: {
      fontSize: 12,
      color: colors.danger,
      fontFamily: FONTS.regular,
    },
  });
