import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
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
