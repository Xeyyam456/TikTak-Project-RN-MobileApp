import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';
import { BANNER_HEIGHT, BANNER_WIDTH } from '../HomeScreen/HomeScreen.styles';

export const styles = StyleSheet.create({
  campaignCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#B380FF',
    justifyContent: 'flex-end',
  },
  campaignOverlay: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  campaignTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: FONTS.extraBold,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.medium,
    marginTop: 2,
  },
});
