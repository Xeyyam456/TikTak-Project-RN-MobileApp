import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';
import { COLUMNS, GRID_GAP, HORIZONTAL_PADDING } from '../HomeScreen/HomeScreen.styles';

export const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

export const CARD_RADIUS = 14;
// Fixed so a one-line and a two-line name produce the same card height and
// the grid rows stay level.
export const LABEL_HEIGHT = 38;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.backgroundLight,
      borderRadius: CARD_RADIUS,
      // Lets the photo run to the card's edges and be clipped by the card's
      // own radius, instead of sitting inset behind a second rounded outline
      // of its own — that frame-within-a-frame was the dated part.
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      // The card already clips the top corners; rounding the bottom two as
      // well makes the photo read as its own tile with the caption sitting
      // under it, rather than a block cut off by the label.
      borderBottomLeftRadius: CARD_RADIUS,
      borderBottomRightRadius: CARD_RADIUS,
    },
    imagePlaceholder: {
      backgroundColor: colors.border,
    },
    labelBox: {
      height: LABEL_HEIGHT,
      paddingHorizontal: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 15,
      color: colors.textPrimary,
      fontFamily: FONTS.medium,
    },
  });
