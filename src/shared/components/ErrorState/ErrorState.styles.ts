import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
    gap: 16,
  },
  message: {
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 160,
  },
});
