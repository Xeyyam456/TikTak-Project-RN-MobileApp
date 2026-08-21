import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F1F0F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000000',
    fontFamily: FONTS.regular,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
  },
});
