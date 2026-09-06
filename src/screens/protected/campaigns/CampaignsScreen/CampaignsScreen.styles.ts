import { Dimensions, StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

const HORIZONTAL_PADDING = 15;
export const CARD_WIDTH = Dimensions.get('window').width - HORIZONTAL_PADDING * 2;
export const CARD_HEIGHT = 160;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loader: {
      marginTop: 32,
    },
    listContent: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 14,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: colors.backgroundLight,
      justifyContent: 'flex-end',
      marginBottom: 16,
    },
    cardOverlay: {
      paddingHorizontal: 18,
      paddingVertical: 14,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    cardTitle: {
      fontSize: 20,
      color: '#FFFFFF',
      fontFamily: FONTS.extraBold,
    },
    cardDescription: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: FONTS.medium,
      marginTop: 2,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyStateText: {
      fontSize: 14,
      color: colors.placeholder,
      fontFamily: FONTS.medium,
      textAlign: 'center',
    },
  });
