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
      flexGrow: 1,
    },
    title: {
      fontSize: 20,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
    },
    loader: {
      marginTop: 48,
    },
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
    menu: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
  });
