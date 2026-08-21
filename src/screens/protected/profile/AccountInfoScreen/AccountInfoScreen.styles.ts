import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../theme/fonts';

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
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  form: {
    gap: 20,
  },
  disabledInput: {
    color: '#9B9B9B',
  },
  formError: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
  submitButton: {
    marginTop: 32,
  },
});
