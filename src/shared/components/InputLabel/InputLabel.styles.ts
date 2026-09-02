import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    label: {
      fontSize: 13,
      color: colors.textSecondary,
      fontFamily: FONTS.regular,
    },
  });
