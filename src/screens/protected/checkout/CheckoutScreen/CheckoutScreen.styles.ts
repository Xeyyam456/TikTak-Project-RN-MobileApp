import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

const ORDER_ROW_HEIGHT = 30;
const ORDER_ROW_GAP = 4;

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  backButton: {
    width: 32,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
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
  orderItemsBox: {
    flex: 1,
    marginTop: 17,
    marginBottom: 6,
    marginHorizontal: 15,
  },
  orderItemsBoxFixed: {
    flex: 0,
  },
  orderItemsBoxBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#b8bbb5',
    borderRadius: 12,
  },
  orderItemsScroll: {
    flex: 1,
  },
  orderItemsContent: {
    paddingLeft: 8,
    paddingRight: 15,
    paddingVertical: 14,
    gap: ORDER_ROW_GAP,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    height: ORDER_ROW_HEIGHT,
  },
  orderItemLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: ORDER_ROW_HEIGHT,
    color: '#1A1A1A',
    fontFamily: FONTS.regular,
  },
  orderItemPrice: {
    fontSize: 13,
    lineHeight: ORDER_ROW_HEIGHT,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    gap: 16,
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
