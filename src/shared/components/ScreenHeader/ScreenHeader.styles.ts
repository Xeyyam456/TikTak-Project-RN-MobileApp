import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 14,
    },
    backButton: {
      width: 32,
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      textAlign: 'center',
    },
    headerSpacer: {
      width: 32,
    },
  });
