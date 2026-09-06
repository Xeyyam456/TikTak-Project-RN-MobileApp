import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';
import { HORIZONTAL_PADDING } from '../SearchResultRow';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    section: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 13,
      color: colors.textMuted,
      fontFamily: FONTS.semiBold,
    },
    clear: {
      fontSize: 13,
      color: colors.primary,
      fontFamily: FONTS.semiBold,
    },
  });
