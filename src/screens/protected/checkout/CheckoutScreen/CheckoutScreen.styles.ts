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
  formSection: {
    paddingHorizontal: 15,
    paddingTop: 8,
    gap: 20,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  fieldValue: {
    fontSize: 14,
    color: '#6B6B6B',
    fontFamily: FONTS.regular,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  paymentOptions: {
    gap: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D8D8E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#7BC043',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7BC043',
  },
  paymentLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  formError: {
    fontSize: 12,
    textAlign: 'center',
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
});
