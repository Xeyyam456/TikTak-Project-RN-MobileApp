import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 24,
      paddingTop: 8,
    },
    loader: {
      marginTop: 32,
    },
    form: {
      gap: 20,
    },
    disabledInput: {
      color: colors.textMuted,
    },
    formError: {
      marginTop: 20,
      fontSize: 12,
      textAlign: 'center',
      color: colors.danger,
      fontFamily: FONTS.regular,
    },
    submitButton: {
      marginTop: 32,
    },
  });
