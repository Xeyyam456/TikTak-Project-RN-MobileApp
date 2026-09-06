import { StyleSheet } from 'react-native';
import { HORIZONTAL_PADDING, ROW_IMAGE_SIZE } from '../SearchResultRow';

// Mirrors SearchResultRow's layout on purpose — the placeholder has to sit
// exactly where the real row will, or the list jumps when results arrive.
export const styles = StyleSheet.create({
  list: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 18,
    gap: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  title: {
    marginBottom: 6,
  },
});

export const IMAGE_SIZE = ROW_IMAGE_SIZE;
