import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#D0D0D8',
    backgroundColor: '#F1F0F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#7BC043',
    borderColor: '#7BC043',
  },
  label: {
    fontSize: 13,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
});
