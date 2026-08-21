import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#E24C4C',
  },
  errorText: {
    fontSize: 12,
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
});
