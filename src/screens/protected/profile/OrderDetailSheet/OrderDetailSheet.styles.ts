import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

const VISIBLE_ITEM_ROWS = 5;
const ITEM_ROW_HEIGHT = 68;
const ITEM_ROW_GAP = 12;
const ITEMS_MAX_HEIGHT =
  VISIBLE_ITEM_ROWS * ITEM_ROW_HEIGHT + (VISIBLE_ITEM_ROWS - 1) * ITEM_ROW_GAP;

export const styles = StyleSheet.create({
  infoGrid: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoColumn: {
    width: '50%',
    gap: 2,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  items: {
    maxHeight: ITEMS_MAX_HEIGHT,
  },
  itemsContent: {
    gap: ITEM_ROW_GAP,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F0F7',
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
  itemPrice: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
});
