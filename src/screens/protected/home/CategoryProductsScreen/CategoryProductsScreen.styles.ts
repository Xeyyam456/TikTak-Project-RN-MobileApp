import { StyleSheet } from 'react-native';
import { GRID_GAP, HORIZONTAL_PADDING } from '@shared/components/ProductCard';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 14,
      marginHorizontal: HORIZONTAL_PADDING,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
    },
    // White text on the colored button above — left untheming on purpose.
    backButtonText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: FONTS.semiBold,
    },
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
    // purpose, same reasoning as backButtonText.
    chipTextActive: {
      color: '#FFFFFF',
    },
    skeletonGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 14,
    },
    list: {
      marginTop: 14,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: 'hidden',
    },
    listContent: {
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    cardWrapper: {
      marginBottom: GRID_GAP,
    },
    cardWrapperRight: {
      marginLeft: GRID_GAP,
    },
  });
