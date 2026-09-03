import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 24,
      paddingTop: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    contactRowBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    contactLabel: {
      fontSize: 15,
      fontFamily: FONTS.regular,
      color: colors.textPrimary,
    },
  });
