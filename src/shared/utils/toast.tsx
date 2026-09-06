import { useMemo } from 'react';
import { View } from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';
import { useTheme } from '../../theme/ThemeContext';
import { CheckIcon, AlertIcon } from '@shared/icons';
import { createStyles } from './toast.styles';

// These must stay real components rendered as JSX below, not plain functions
// called inline by the config. react-native-toast-message invokes
// `config[type](props)` as a direct function call inside its own ToastUI
// render (see ToastUI.js), so a useTheme() called straight from the config
// entry would join ToastUI's hook list — and the library's built-in `info`
// fallback calls no hooks, so showing an `info` toast would change the hook
// count between renders and crash with "Rendered fewer hooks than expected".
function SuccessToastView(props: ToastConfigParams<any>) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
}

function ErrorToastView(props: ToastConfigParams<any>) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
}

export const toastConfig: ToastConfig = {
  success: props => <SuccessToastView {...props} />,
  error: props => <ErrorToastView {...props} />,
};

export function showSuccessToast(message: string) {
  Toast.show({ type: 'success', text1: message });
}

export function showErrorToast(message: string) {
  Toast.show({ type: 'error', text1: message });
}
