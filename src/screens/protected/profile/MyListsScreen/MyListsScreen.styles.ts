import { StyleSheet } from 'react-native';
import { GRID_GAP, HORIZONTAL_PADDING } from '@shared/components/ProductCard';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});
