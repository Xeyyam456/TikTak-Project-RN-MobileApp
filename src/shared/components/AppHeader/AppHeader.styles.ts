import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import type { ThemeColors } from '../../../theme/colors';

const HORIZONTAL_PADDING = 15;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingBottom: 16,
      backgroundColor: colors.surface,
      zIndex: 1,
      elevation: 4,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    logo: {
      fontSize: 24,
      color: colors.textPrimary,
      fontFamily: FONTS.extraBold,
    },
    cartWrapper: {
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -6,
      right: -8,
      minWidth: 16,
      height: 16,
      paddingHorizontal: 3,
      borderRadius: 8,
      backgroundColor: colors.danger,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: colors.surface,
    },
    badgeText: {
      fontSize: 10,
      lineHeight: 12,
      color: '#FFFFFF',
      fontFamily: FONTS.bold,
    },
  });
