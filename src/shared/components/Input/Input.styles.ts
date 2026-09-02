import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
    },
    input: {
      backgroundColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: FONTS.regular,
    },
    inputWithIcon: {
      paddingRight: 44,
    },
    eyeButton: {
      position: 'absolute',
      right: 14,
    },
  });
