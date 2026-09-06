import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyStateIconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    emptyStateText: {
      fontSize: 14,
      color: colors.placeholder,
      fontFamily: FONTS.medium,
      textAlign: 'center',
    },
  });
