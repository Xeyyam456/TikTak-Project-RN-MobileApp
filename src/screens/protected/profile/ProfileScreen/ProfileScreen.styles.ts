import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  loader: {
    marginTop: 48,
  },
  name: {
    marginTop: 16,
    fontSize: 17,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  phone: {
    marginTop: 4,
    fontSize: 14,
    color: '#4F5D75',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  menu: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
