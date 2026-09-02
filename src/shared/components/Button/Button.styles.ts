import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDanger: {
      backgroundColor: colors.danger,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    title: {
      color: colors.white,
      fontSize: 17,
      fontFamily: FONTS.semiBold,
    },
  });
