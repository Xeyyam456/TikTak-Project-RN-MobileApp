import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const COLUMNS = 3;
export const GRID_GAP = 12;
export const HORIZONTAL_PADDING = 15;
export const BANNER_WIDTH = Dimensions.get('window').width - HORIZONTAL_PADDING * 2;
export const BANNER_HEIGHT = 160;

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 14,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F0F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 21,
    gap: 8,
  },
  addressTextGroup: {
    flex: 1,
    gap: 0,
  },
  addressLabel: {
    fontSize: 17,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  addressValue: {
    fontSize: 15,
    color: '#555555',
    fontFamily: FONTS.regular,
  },
  campaignCarousel: {
    height: BANNER_HEIGHT,
    borderRadius: 10,
    marginBottom: 20,
  },
  loader: {
    marginTop: 24,
  },
  row: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
});
