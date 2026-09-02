import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    box: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 1.5,
      borderColor: colors.borderMuted,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    label: {
      fontSize: 13,
      color: colors.textSecondary,
      fontFamily: FONTS.regular,
    },
  });
