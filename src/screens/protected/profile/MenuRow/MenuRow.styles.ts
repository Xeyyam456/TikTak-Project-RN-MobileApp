import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

export const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  menuLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
});
