import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    image: {
      width: '100%',
      aspectRatio: 16 / 9,
      borderRadius: 16,
    },
    title: {
      marginTop: 16,
      fontSize: 19,
      color: colors.textPrimary,
      fontFamily: FONTS.extraBold,
    },
    description: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: 21,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
    },
  });
