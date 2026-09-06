import { StyleSheet } from 'react-native';
import { GRID_GAP, HORIZONTAL_PADDING } from '../HomeScreen/HomeScreen.styles';
import { CARD_RADIUS, CARD_WIDTH } from '../CategoryCard';

// Re-exported so the skeleton sizes its blocks from the real card's own
// constants rather than repeating the grid math.
export { CARD_RADIUS, CARD_WIDTH };

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
    alignItems: 'center',
    gap: 7,
  },
});
