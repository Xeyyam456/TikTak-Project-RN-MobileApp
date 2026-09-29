import { StyleSheet } from 'react-native';
import { FONTS } from '../../theme/fonts';
import type { ThemeColors } from '../../theme/colors';

const TOAST_BACKGROUND = '#3F51B5';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    toast: {
      backgroundColor: TOAST_BACKGROUND,
      borderLeftWidth: 0,
      borderRadius: 16,
      height: undefined,
      paddingVertical: 12,
      elevation: 4,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    content: {
      paddingHorizontal: 12,
    },
    text1: {
      color: colors.white,
      fontSize: 15,
      fontFamily: FONTS.semiBold,
    },
    iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 12,
    },
    successCircle: {
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    errorCircle: {
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
  });
