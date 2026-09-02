import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
    },
    description: {
      marginTop: 8,
      fontSize: 13,
      lineHeight: 19,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
    price: {
      marginTop: 16,
      marginBottom: 16,
      fontSize: 20,
      color: colors.textPrimary,
      fontFamily: FONTS.extraBold,
      textAlign: 'center',
    },
    inBasket: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 10,
      backgroundColor: colors.border,
    },
    inBasketText: {
      fontSize: 15,
      color: colors.primary,
      fontFamily: FONTS.semiBold,
    },
  });
