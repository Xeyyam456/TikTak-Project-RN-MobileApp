import { StyleSheet } from 'react-native';
import { GRID_GAP, HORIZONTAL_PADDING } from '@shared/components/ProductCard';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    marginHorizontal: HORIZONTAL_PADDING,
    backgroundColor: '#7BC043',
    borderRadius: 10,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
  },
  chipsRow: {
    marginTop: 14,
    marginHorizontal: HORIZONTAL_PADDING,
    borderRadius: 10,
    overflow: 'hidden',
    flexGrow: 0,
  },
  chipsContent: {
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 38,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#7BC043',
    borderColor: '#7BC043',
  },
  chipText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#555555',
    fontFamily: FONTS.medium,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  loader: {
    marginTop: 32,
  },
  list: {
    marginTop: 14,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
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
});
