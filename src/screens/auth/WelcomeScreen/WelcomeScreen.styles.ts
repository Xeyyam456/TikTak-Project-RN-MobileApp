import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
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
      color: colors.textSecondary,
      lineHeight: 19,
      fontFamily: FONTS.regular,
    },
  });
