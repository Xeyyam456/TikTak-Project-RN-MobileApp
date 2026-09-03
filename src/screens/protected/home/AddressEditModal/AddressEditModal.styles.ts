import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.overlay,
      paddingHorizontal: 24,
    },
    modalCard: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 20,
      gap: 16,
    },
    modalTitle: {
      fontSize: 18,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    pickFromMapRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      alignSelf: 'flex-start',
    },
    pickFromMapText: {
      fontSize: 13,
      color: colors.primary,
      fontFamily: FONTS.semiBold,
    },
    modalCancel: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.medium,
    },
  });
