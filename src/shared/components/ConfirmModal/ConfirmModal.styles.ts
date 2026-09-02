import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.overlay,
      paddingHorizontal: 32,
    },
    card: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
    },
    iconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.border,
      marginBottom: 16,
    },
    iconCircleDanger: {
      backgroundColor: colors.dangerLight,
    },
    title: {
      fontSize: 18,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
    },
    message: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: 20,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
    confirmButton: {
      alignSelf: 'stretch',
      marginTop: 24,
    },
    cancel: {
      marginTop: 16,
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.semiBold,
      textAlign: 'center',
    },
  });
