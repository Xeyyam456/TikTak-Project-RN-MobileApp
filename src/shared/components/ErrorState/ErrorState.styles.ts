import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 32,
      paddingHorizontal: 24,
      gap: 16,
    },
    message: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
    retryButton: {
      minWidth: 160,
    },
  });
