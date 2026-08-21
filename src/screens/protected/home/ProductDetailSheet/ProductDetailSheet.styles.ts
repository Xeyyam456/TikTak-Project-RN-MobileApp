import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 12,
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  price: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: FONTS.extraBold,
    textAlign: 'center',
  },
  inBasket: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F1F0F7',
  },
  inBasketText: {
    fontSize: 15,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});
