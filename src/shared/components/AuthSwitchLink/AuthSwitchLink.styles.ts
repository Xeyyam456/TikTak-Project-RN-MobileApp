import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
  link: {
    marginLeft: 6,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});
