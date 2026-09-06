import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    formSection: {
      paddingHorizontal: 15,
      paddingTop: 8,
      gap: 20,
    },
    field: {
      gap: 6,
    },
    fieldLabel: {
      fontSize: 15,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    fieldValue: {
      fontSize: 14,
      color: colors.textTertiary,
      fontFamily: FONTS.regular,
    },
    noteInput: {
      height: 100,
      textAlignVertical: 'top',
    },
  });
