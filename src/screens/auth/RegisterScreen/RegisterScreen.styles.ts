import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 22,
      textAlign: 'center',
      color: colors.textPrimary,
      marginTop: 48,
      fontFamily: FONTS.bold,
    },
    form: {
      marginTop: 48,
      gap: 20,
    },
    footer: {
      marginTop: 40,
      gap: 20,
    },
    formError: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.danger,
      fontFamily: FONTS.regular,
    },
  });
