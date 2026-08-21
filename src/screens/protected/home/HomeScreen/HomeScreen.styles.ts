import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const COLUMNS = 3;
const GRID_GAP = 12;
const HORIZONTAL_PADDING = 15;
const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;
const BANNER_WIDTH = Dimensions.get('window').width - HORIZONTAL_PADDING * 2;
const BANNER_HEIGHT = 160;

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
  campaignCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#B380FF',
    justifyContent: 'flex-end',
  },
  campaignOverlay: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  campaignTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: FONTS.extraBold,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.medium,
    marginTop: 2,
  },
  loader: {
    marginTop: 24,
  },
  row: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    gap: 6,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  cardImagePlaceholder: {
    backgroundColor: '#F1F0F7',
  },
  cardLabel: {
    fontSize: 12,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  modalCancel: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.medium,
  },
});
