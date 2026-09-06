import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

// Grid layout lives in the shared ProductGrid/ProductGridSkeleton — this
// file only covers the screen shell.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    emptyText: {
      marginTop: 32,
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
  });
