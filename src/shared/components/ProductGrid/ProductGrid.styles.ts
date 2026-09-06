import { StyleSheet } from 'react-native';
import { GRID_GAP, HORIZONTAL_PADDING } from '../ProductCard';

// No themed colors here — the grid is pure layout, every colored surface
// belongs to the ProductCards inside it.
export const styles = StyleSheet.create({
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
