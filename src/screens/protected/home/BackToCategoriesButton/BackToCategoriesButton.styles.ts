import { StyleSheet } from 'react-native';
import { HORIZONTAL_PADDING } from '@shared/components/ProductCard';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 14,
      marginHorizontal: HORIZONTAL_PADDING,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
    },
    // White text on the colored button above — left untheming on purpose.
    label: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: FONTS.semiBold,
    },
  });
