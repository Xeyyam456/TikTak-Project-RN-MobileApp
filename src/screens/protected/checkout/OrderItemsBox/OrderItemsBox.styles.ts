import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

const ORDER_ROW_HEIGHT = 30;
const ORDER_ROW_GAP = 4;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    box: {
      flex: 1,
      marginTop: 17,
      marginBottom: 6,
      marginHorizontal: 15,
    },
    boxFixed: {
      flex: 0,
    },
    // One-off decorative box color, left as-is (not a semantic token) —
    // same convention as the category/campaign card pastels.
    boxBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#b8bbb5',
      borderRadius: 12,
    },
    scroll: {
      flex: 1,
    },
    content: {
      paddingLeft: 8,
      paddingRight: 15,
      paddingVertical: 14,
      gap: ORDER_ROW_GAP,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      height: ORDER_ROW_HEIGHT,
    },
    label: {
      flex: 1,
      fontSize: 14,
      lineHeight: ORDER_ROW_HEIGHT,
      color: colors.textPrimary,
      fontFamily: FONTS.regular,
    },
    price: {
      fontSize: 13,
      lineHeight: ORDER_ROW_HEIGHT,
      color: colors.textPrimary,
      fontFamily: FONTS.semiBold,
    },
  });
