import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import { HORIZONTAL_PADDING } from '../ProductCard';

export const SUMMARY_BAR_HEIGHT = 56;
export const SUMMARY_BAR_GAP = 8;
export const SUMMARY_BAR_TOP_GAP = 14;

export const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: HORIZONTAL_PADDING,
    right: HORIZONTAL_PADDING,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7BC043',
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
