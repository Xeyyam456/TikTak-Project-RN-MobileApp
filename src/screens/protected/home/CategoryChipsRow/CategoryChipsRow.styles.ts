import { StyleSheet } from 'react-native';
import { HORIZONTAL_PADDING } from '@shared/components/ProductCard';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chipsRow: {
      marginTop: 14,
      marginHorizontal: HORIZONTAL_PADDING,
      borderRadius: 10,
      overflow: 'hidden',
      flexGrow: 0,
    },
    chipsContent: {
      gap: 10,
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      minHeight: 38,
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.backgroundLight,
      backgroundColor: colors.surface,
    },
    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    chipText: {
      fontSize: 13,
      lineHeight: 18,
      color: colors.textSecondary,
      fontFamily: FONTS.medium,
    },
    // White text on the active (colored) chip above — left untheming on
    // purpose, same reasoning as the screen's backButtonText.
    chipTextActive: {
      color: '#FFFFFF',
    },
  });
