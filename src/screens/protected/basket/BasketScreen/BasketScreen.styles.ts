import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    marginTop: 32,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F1F0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#B8B8C2',
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  rowImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  rowInfo: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  rowPrice: {
    fontSize: 13,
    color: '#6B6B6B',
    fontFamily: FONTS.regular,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#7BC043',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  stepperButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  stepperQuantity: {
    width: 22,
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6B6B6B',
    fontFamily: FONTS.regular,
  },
  summaryTotalWrapper: {
    alignItems: 'flex-end',
  },
  summaryTotalLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  summaryTotalValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  checkoutButton: {
    backgroundColor: '#7BC043',
  },
});
