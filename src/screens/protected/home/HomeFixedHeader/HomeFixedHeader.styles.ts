import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';
import { BANNER_HEIGHT, HORIZONTAL_PADDING } from '../HomeScreen/HomeScreen.styles';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    fixedHeader: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 14,
    },
    addressCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 4,
      marginBottom: 21,
      gap: 8,
    },
    addressTextGroup: {
      flex: 1,
      gap: 0,
    },
    addressLabel: {
      fontSize: 17,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    addressValue: {
      fontSize: 15,
      color: colors.textSecondary,
      fontFamily: FONTS.regular,
    },
    campaignCarousel: {
      height: BANNER_HEIGHT,
      borderRadius: 10,
      marginBottom: 20,
    },
  });
