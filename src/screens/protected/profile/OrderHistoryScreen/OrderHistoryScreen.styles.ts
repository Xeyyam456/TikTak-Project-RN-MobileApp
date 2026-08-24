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
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 8,
  },
  cardGap: {
    height: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: 16,
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
    color: '#1A1A1A',
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
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
  total: {
    fontSize: 15,
    color: '#7BC043',
    fontFamily: FONTS.extraBold,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F0F7',
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
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
  addressText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  viewButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF6DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 32,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});
