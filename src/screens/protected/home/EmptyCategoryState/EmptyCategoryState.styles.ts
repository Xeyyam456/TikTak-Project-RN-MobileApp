import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F1F0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: '#B8B8C2',
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
});
