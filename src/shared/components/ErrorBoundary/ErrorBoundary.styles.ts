import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    fontFamily: FONTS.regular,
    marginBottom: 12,
  },
  debug: {
    fontSize: 11,
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
});
