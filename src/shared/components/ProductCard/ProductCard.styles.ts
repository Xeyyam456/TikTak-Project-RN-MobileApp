import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const COLUMNS = 2;
export const GRID_GAP = 12;
export const HORIZONTAL_PADDING = 15;
export const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

// bulkPriceQty/stepperMinus keep their one-off decorative pastel literals
// (not semantic tokens, same as before dark mode) — stepperPlusText stays
// hardcoded white because it's text on the always-green stepperPlus button.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.backgroundLight,
      borderRadius: 14,
      padding: 6,
      gap: 3,
    },
    cardImage: {
      width: '92%',
      aspectRatio: 1,
      alignSelf: 'center',
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardTitle: {
      fontSize: 13,
      lineHeight: 17,
      height: 34,
      color: colors.textPrimary,
      fontFamily: FONTS.medium,
      textAlign: 'center',
    },
    cardPrice: {
      fontSize: 14,
      lineHeight: 18,
      height: 18,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
    },
    addButton: {
      height: 34,
      paddingVertical: 0,
    },
    // Card size must never move to fit translated text — Russian/English
    // "add to basket" copy runs longer than the original Azerbaijani, so
    // this shrinks the button's own font instead of growing the button.
    addButtonTitle: {
      fontSize: 12,
    },
    bulkPriceLine: {
      fontSize: 12,
      lineHeight: 18,
      height: 18,
      textAlign: 'center',
    },
    bulkPriceQty: {
      color: '#B85C5C',
      fontFamily: FONTS.medium,
    },
    bulkPriceEquals: {
      color: colors.danger,
      fontFamily: FONTS.semiBold,
    },
    bulkPriceTotal: {
      fontSize: 13,
      color: colors.danger,
      fontFamily: FONTS.extraBold,
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    stepperMinus: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: '#F6D9D9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperMinusText: {
      fontSize: 18,
      color: colors.danger,
      fontFamily: FONTS.bold,
    },
    stepperPlus: {
      flex: 1,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperPlusText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontFamily: FONTS.semiBold,
    },
  });
