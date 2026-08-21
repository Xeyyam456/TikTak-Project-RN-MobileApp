import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F0F7',
    marginBottom: 16,
  },
  iconCircleDanger: {
    backgroundColor: '#FBE6E6',
  },
  title: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  confirmButton: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
  cancel: {
    marginTop: 16,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
});
