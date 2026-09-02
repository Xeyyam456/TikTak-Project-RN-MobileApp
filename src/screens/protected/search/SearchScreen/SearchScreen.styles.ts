import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

const HORIZONTAL_PADDING = 15;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchBox: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 14,
    },
    loader: {
      marginTop: 32,
    },
    emptyText: {
      marginTop: 32,
      paddingHorizontal: HORIZONTAL_PADDING,
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
      textAlign: 'center',
    },
    resultsList: {
      flex: 1,
    },
    results: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 18,
      gap: 18,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    rowImage: {
      width: 56,
      height: 56,
      borderRadius: 10,
    },
    rowText: {
      flex: 1,
      gap: 2,
    },
    rowTitle: {
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: FONTS.semiBold,
    },
    rowPrice: {
      fontSize: 13,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
    },
    historySection: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 20,
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    historyTitle: {
      fontSize: 13,
      color: colors.textMuted,
      fontFamily: FONTS.semiBold,
    },
    historyClear: {
      fontSize: 13,
      color: colors.primary,
      fontFamily: FONTS.semiBold,
    },
    historyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    historyText: {
      flex: 1,
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: FONTS.regular,
    },
  });
