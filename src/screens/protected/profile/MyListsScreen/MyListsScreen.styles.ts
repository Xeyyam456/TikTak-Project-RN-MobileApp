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
    loader: {
      marginTop: 32,
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
    emptyText: {
      marginTop: 32,
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
  });
