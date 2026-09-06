import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import type { ThemeColors } from '../../../../theme/colors';

// Shared by OrderCard and OrderCardSkeleton on purpose — the skeleton is a
// placeholder for this exact card, so the two must stay dimensionally
// identical or the list visibly reflows when real data arrives.
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    skeletonList: {
      paddingHorizontal: 15,
      paddingTop: 8,
    },
    skeletonGap: {
      marginTop: 12,
    },
    card: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.backgroundLight,
      borderRadius: 16,
      padding: 16,
      // Not themed on purpose, same as every other shadowColor in the app.
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
    cardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    orderNumber: {
      fontSize: 15,
      color: colors.textPrimary,
      fontFamily: FONTS.bold,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 11,
      fontFamily: FONTS.semiBold,
    },
    cardMiddle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    date: {
      fontSize: 13,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
    },
    total: {
      fontSize: 15,
      color: colors.primary,
      fontFamily: FONTS.extraBold,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    cardBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    addressBlock: {
      flex: 1,
      gap: 2,
    },
    addressLabel: {
      fontSize: 12,
      color: colors.textMuted,
      fontFamily: FONTS.regular,
    },
    addressText: {
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: FONTS.semiBold,
    },
    viewButton: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    skeletonLabel: {
      marginBottom: 6,
    },
  });
