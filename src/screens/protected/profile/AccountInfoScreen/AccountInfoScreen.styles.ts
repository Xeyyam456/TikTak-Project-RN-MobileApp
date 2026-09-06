import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../../theme/colors';

// The form's own styles live with it in AccountInfoForm/.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 32,
    },
  });
