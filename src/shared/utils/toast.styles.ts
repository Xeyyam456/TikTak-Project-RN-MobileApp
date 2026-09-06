import { StyleSheet } from 'react-native';
import { FONTS } from '../../theme/fonts';
import type { ThemeColors } from '../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    toast: {
      backgroundColor: '#FFF8E1',
      borderLeftWidth: 0,
      borderTopWidth: 3,
      borderRadius: 24,
      height: undefined,
      paddingVertical: 12,
      elevation: 4,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    successAccent: {
      borderTopColor: colors.primary,
    },
    errorAccent: {
      borderTopColor: colors.danger,
    },
    content: {
      paddingHorizontal: 14,
    },
    // Fixed dark text, not colors.textPrimary — the toast card itself is
    // staying a fixed cream regardless of theme (see `toast.backgroundColor`
    // above), so its text needs to stay readable against that, not follow
    // dark mode's light text color.
    text1: {
      color: '#1A1A1A',
      fontSize: 15,
      fontFamily: FONTS.semiBold,
    },
    iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 14,
    },
    successCircle: {
      backgroundColor: colors.primaryTint,
    },
    errorCircle: {
      backgroundColor: colors.dangerTint,
    },
  });
