import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
    },
    iconHalo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    iconCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
    countdown: {
      marginTop: 16,
      fontSize: 13,
      color: colors.primary,
      fontFamily: FONTS.semiBold,
      textAlign: 'center',
    },
    footer: {
      paddingHorizontal: 15,
      paddingTop: 16,
    },
  });
