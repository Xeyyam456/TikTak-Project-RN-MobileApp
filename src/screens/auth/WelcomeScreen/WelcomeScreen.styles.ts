import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    marginLeft: -90,
  },
  footer: {
    marginTop: 40,
    gap: 20,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    lineHeight: 19,
    fontFamily: FONTS.regular,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
  loginLink: {
    marginLeft: 6,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});
