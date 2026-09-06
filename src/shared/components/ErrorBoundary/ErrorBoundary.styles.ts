import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
      gap: 12,
    },
    title: {
      fontSize: 18,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    message: {
      fontSize: 13,
      textAlign: 'center',
      color: colors.textSecondary,
      fontFamily: FONTS.regular,
      marginBottom: 12,
    },
    debug: {
      fontSize: 11,
      color: colors.danger,
      fontFamily: FONTS.regular,
    },
  });
