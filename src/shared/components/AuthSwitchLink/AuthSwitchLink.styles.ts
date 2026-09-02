import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    text: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: FONTS.regular,
    },
    link: {
      marginLeft: 6,
      color: colors.primary,
      fontFamily: FONTS.semiBold,
    },
  });
