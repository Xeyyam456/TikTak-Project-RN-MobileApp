import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  title: {
    color: COLORS.white,
    fontSize: 17,
    fontFamily: FONTS.semiBold,
  },
});
