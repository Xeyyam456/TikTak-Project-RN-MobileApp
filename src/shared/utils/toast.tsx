import { StyleSheet, View } from 'react-native';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { FONTS } from '../../theme/fonts';
import { CheckIcon, AlertIcon } from '../components/icons';

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.successAccent]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text1NumberOfLines={2}
      renderLeadingIcon={() => (
        <View style={[styles.iconCircle, styles.successCircle]}>
          <CheckIcon size={16} color="#7BC043" />
        </View>
      )}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={[styles.toast, styles.errorAccent]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text1NumberOfLines={2}
      renderLeadingIcon={() => (
        <View style={[styles.iconCircle, styles.errorCircle]}>
          <AlertIcon size={16} color="#E24C4C" />
        </View>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 0,
    borderTopWidth: 3,
    borderRadius: 24,
    height: undefined,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  successAccent: {
    borderTopColor: '#7BC043',
  },
  errorAccent: {
    borderTopColor: '#E24C4C',
  },
  content: {
    paddingHorizontal: 14,
  },
  text1: {
    color: '#1A1A1A',
    fontSize: 15,
    fontFamily: FONTS.semiBold,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
  },
  successCircle: {
    backgroundColor: '#7BC04326',
  },
  errorCircle: {
    backgroundColor: '#E24C4C26',
  },
});

export function showSuccessToast(message: string) {
  Toast.show({ type: 'success', text1: message });
}

export function showErrorToast(message: string) {
  Toast.show({ type: 'error', text1: message });
}
