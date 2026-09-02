import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

const HORIZONTAL_PADDING = 15;

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 14,
  },
  loader: {
    marginTop: 32,
  },
  emptyText: {
    marginTop: 32,
    paddingHorizontal: HORIZONTAL_PADDING,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  resultsList: {
    flex: 1,
  },
  results: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 18,
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
  historySection: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 13,
    color: '#9B9B9B',
    fontFamily: FONTS.semiBold,
  },
  historyClear: {
    fontSize: 13,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0F7',
  },
  historyText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.regular,
  },
});
