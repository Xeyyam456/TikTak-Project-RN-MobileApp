import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../theme/colors';
import { CARD_WIDTH } from '../ProductCard';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.backgroundLight,
      borderRadius: 14,
      padding: 6,
      gap: 6,
    },
    image: {
      width: '92%',
      aspectRatio: 1,
      alignSelf: 'center',
      borderRadius: 10,
    },
  });
