import { Dimensions, StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../../theme/colors';

// Shared grid/banner geometry — also imported by CampaignCard,
// HomeFixedHeader and CategoryGridSkeleton, so it stays here even though
// this file's own style block no longer uses all of it.
export const COLUMNS = 3;
export const GRID_GAP = 12;
export const HORIZONTAL_PADDING = 15;
export const BANNER_WIDTH = Dimensions.get('window').width - HORIZONTAL_PADDING * 2;
export const BANNER_HEIGHT = 160;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    row: {
      gap: GRID_GAP,
      marginBottom: GRID_GAP,
    },
  });
