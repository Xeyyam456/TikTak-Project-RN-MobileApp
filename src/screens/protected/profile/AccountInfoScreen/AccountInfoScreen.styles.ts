import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  loader: {
    marginTop: 32,
  },
  form: {
    gap: 20,
  },
  disabledInput: {
    color: '#9B9B9B',
  },
  formError: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
  submitButton: {
    marginTop: 32,
  },
});
