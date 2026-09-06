import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '@shared/services/auth.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import {
  applyAzPhonePrefix,
  validatePassword,
  validatePhone,
} from '@shared/utils/validation';
import type { RootStackParamList } from '@typings/navigation';

/** Login form state, validation and the sign-in request. */
export default function useLoginForm() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const [phone, setPhoneState] = useState('+994');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { progress } = useReanimatedKeyboardAnimation();

  async function handleSubmit() {
    const nextErrors = {
      phone: validatePhone(phone),
      password: validatePassword(password),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setFormError(undefined);
    setLoading(true);
    try {
      await login({ phone, password }, rememberMe);
      showSuccessToast(t('login.successToast'));
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  // Guarantees the submit button is reachable when an early field is
  // focused. 0ms if the keyboard is already up, ~300ms if it still has to
  // animate open — otherwise the scroll races the keyboard and jumps.
  function handleFieldFocus() {
    const keyboardAlreadyOpen = progress.value > 0.5;
    setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: true }),
      keyboardAlreadyOpen ? 0 : 300,
    );
  }

  return {
    phone,
    setPhone: (text: string) => setPhoneState(applyAzPhonePrefix(text)),
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    errors,
    formError,
    loading,
    scrollRef,
    handleFieldFocus,
    handleSubmit,
  };
}
