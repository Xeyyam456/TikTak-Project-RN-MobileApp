import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    // One-off decorative placeholder color, left as-is.
    avatar: {
      alignSelf: 'center',
      width: 120,
      height: 120,
      borderRadius: 60,
      marginTop: 28,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4F5D75',
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    // Intentionally not theme-adaptive — same reasoning as shadowColor, a
    // translucent black scrim reads the same in both themes.
    avatarLoading: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sheetTitle: {
      fontSize: 16,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
      marginBottom: 4,
    },
  });
