import { Dimensions, StyleSheet } from 'react-native';
import {
  COLUMNS,
  GRID_GAP,
  HORIZONTAL_PADDING,
} from '../HomeScreen/HomeScreen.styles';

// Card width mirrors CategoryCard's own grid math so the placeholder grid
// lines up exactly with the real one it stands in for.
const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  card: {
    width: CARD_WIDTH,
    gap: 6,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
});
