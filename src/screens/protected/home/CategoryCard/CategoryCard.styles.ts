import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import { COLUMNS, GRID_GAP, HORIZONTAL_PADDING } from '../HomeScreen/HomeScreen.styles';

const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

export const styles = StyleSheet.create({
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
});
