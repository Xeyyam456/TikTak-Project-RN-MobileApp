import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../theme/colors';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    bone: {
      backgroundColor: colors.border,
    },
  });
