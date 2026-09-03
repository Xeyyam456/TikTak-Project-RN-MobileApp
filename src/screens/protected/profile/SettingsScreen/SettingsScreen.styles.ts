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
      paddingTop: 8,
      gap: 28,
    },
    sectionTitle: {
      fontSize: 14,
      fontFamily: FONTS.semiBold,
      color: colors.textMuted,
      marginBottom: 12,
      textTransform: 'uppercase',
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    languageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    languageRowBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    languageLabel: {
      fontSize: 15,
      fontFamily: FONTS.regular,
      color: colors.textPrimary,
    },
    languageLabelActive: {
      fontFamily: FONTS.semiBold,
      color: colors.primary,
    },
    hint: {
      fontSize: 12,
      fontFamily: FONTS.regular,
      color: colors.textMuted,
      marginTop: 8,
    },
    versionText: {
      fontSize: 12,
      fontFamily: FONTS.regular,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: 4,
    },
  });
