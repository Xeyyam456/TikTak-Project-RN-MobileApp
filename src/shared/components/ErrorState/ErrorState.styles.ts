import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
    gap: 16,
  },
  message: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 160,
  },
});
