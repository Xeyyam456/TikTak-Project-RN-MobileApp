import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

// Shared by the screen, the skeleton and the history section so all four
// line up on the same gutter — re-exported from this folder's index.ts,
// same pattern as ProductCard's layout constants.
export const HORIZONTAL_PADDING = 15;
export const ROW_IMAGE_SIZE = 56;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    rowImage: {
      width: ROW_IMAGE_SIZE,
      height: ROW_IMAGE_SIZE,
      borderRadius: 10,
    },
    rowText: {
      flex: 1,
      gap: 2,
    },
    rowTitle: {
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: FONTS.semiBold,
    },
    rowPrice: {
      fontSize: 13,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
    },
  });
