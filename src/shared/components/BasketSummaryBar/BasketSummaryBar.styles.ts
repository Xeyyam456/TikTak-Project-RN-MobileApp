import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';
import { HORIZONTAL_PADDING } from '../ProductCard';

export const SUMMARY_BAR_HEIGHT = 56;
export const SUMMARY_BAR_GAP = 8;
export const SUMMARY_BAR_TOP_GAP = 14;

// countBadge/countText/label/total below intentionally stay hardcoded
// white/dark literals rather than theme tokens: they're contrast colors
// against this bar's own always-green background (colors.primary is the
// same brand green in both palettes), not against the page, so they must
// not flip with the theme.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    bar: {
      position: 'absolute',
      left: HORIZONTAL_PADDING,
      right: HORIZONTAL_PADDING,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    countBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    countText: {
      fontSize: 16,
      color: '#1A1A1A',
      fontFamily: FONTS.bold,
    },
    label: {
      fontSize: 17,
      color: '#FFFFFF',
      fontFamily: FONTS.semiBold,
    },
    total: {
      fontSize: 17,
      color: '#FFFFFF',
      fontFamily: FONTS.bold,
    },
  });
