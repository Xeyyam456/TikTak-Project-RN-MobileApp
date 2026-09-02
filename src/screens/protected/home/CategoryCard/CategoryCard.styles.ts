import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';
import { COLUMNS, GRID_GAP, HORIZONTAL_PADDING } from '../HomeScreen/HomeScreen.styles';

const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      borderWidth: 1,
      borderColor: colors.backgroundLight,
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 4,
      alignItems: 'center',
      gap: 6,
    },
    cardImage: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 10,
    },
    cardImagePlaceholder: {
      backgroundColor: colors.border,
    },
    cardLabel: {
      fontSize: 12,
      color: colors.textPrimary,
      fontFamily: FONTS.medium,
    },
  });
