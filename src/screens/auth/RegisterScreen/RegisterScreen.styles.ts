import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: '#1A1A1A',
    marginTop: 48,
    fontFamily: FONTS.bold,
  },
  form: {
    marginTop: 48,
    gap: 20,
  },
  footer: {
    marginTop: 40,
    gap: 20,
  },
  formError: {
    fontSize: 12,
    textAlign: 'center',
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
});
