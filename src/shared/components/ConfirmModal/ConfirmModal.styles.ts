import { StyleSheet } from 'react-native';
import { FONTS } from '../../../theme/fonts';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  iconCircleDanger: {
    backgroundColor: COLORS.dangerLight,
  },
  title: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textMuted,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  confirmButton: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
  cancel: {
    marginTop: 16,
    fontSize: 14,
    color: COLORS.textMuted,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
});
