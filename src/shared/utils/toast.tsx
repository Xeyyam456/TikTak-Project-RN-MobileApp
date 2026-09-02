import { StyleSheet, View } from 'react-native';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { FONTS } from '../../theme/fonts';
import type { ThemeColors } from '../../theme/colors';
import { useTheme } from '../../theme/ThemeContext';
import { CheckIcon, AlertIcon } from '../components/icons';

// Rendered by react-native-toast-message as `config[type](toastProps)`
// during <Toast config={toastConfig} />'s own render pass (that component
// sits inside ThemeProvider in App.tsx) — calling useTheme() here runs
// during that render, same as any component would.
export const toastConfig: ToastConfig = {
  success: props => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return (
      <BaseToast
        {...props}
        style={[styles.toast, styles.successAccent]}
        contentContainerStyle={styles.content}
        text1Style={styles.text1}
        text1NumberOfLines={2}
        renderLeadingIcon={() => (
          <View style={[styles.iconCircle, styles.successCircle]}>
            <CheckIcon size={16} color={colors.primary} />
          </View>
        )}
      />
    );
  },
  error: props => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return (
      <ErrorToast
        {...props}
        style={[styles.toast, styles.errorAccent]}
        contentContainerStyle={styles.content}
        text1Style={styles.text1}
        text1NumberOfLines={2}
        renderLeadingIcon={() => (
          <View style={[styles.iconCircle, styles.errorCircle]}>
            <AlertIcon size={16} color={colors.danger} />
          </View>
        )}
      />
    );
  },
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    toast: {
      backgroundColor: '#FFF8E1',
      borderLeftWidth: 0,
      borderTopWidth: 3,
      borderRadius: 24,
      height: undefined,
      paddingVertical: 12,
      elevation: 4,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    successAccent: {
      borderTopColor: colors.primary,
    },
    errorAccent: {
      borderTopColor: colors.danger,
    },
    content: {
      paddingHorizontal: 14,
    },
    // Fixed dark text, not colors.textPrimary — the toast card itself is
    // staying a fixed cream regardless of theme (see `toast.backgroundColor`
    // above), so its text needs to stay readable against that, not follow
    // dark mode's light text color.
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
      backgroundColor: colors.primaryTint,
    },
    errorCircle: {
      backgroundColor: colors.dangerTint,
    },
  });

export function showSuccessToast(message: string) {
  Toast.show({ type: 'success', text1: message });
}

export function showErrorToast(message: string) {
  Toast.show({ type: 'error', text1: message });
}
