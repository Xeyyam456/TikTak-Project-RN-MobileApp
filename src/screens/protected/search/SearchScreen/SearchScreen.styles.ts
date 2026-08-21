import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

const HORIZONTAL_PADDING = 15;

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 14,
  },
  loader: {
    marginTop: 32,
  },
  emptyText: {
    marginTop: 32,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  results: {
    marginTop: 18,
    gap: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  rowPrice: {
    fontSize: 13,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
});
