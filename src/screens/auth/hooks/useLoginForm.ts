import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import useAuthFormScroll from './useAuthFormScroll';

/** Login form state, validation and the sign-in request. */
export default function useLoginForm() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { scrollRef, handleFieldFocus } = useAuthFormScroll();

  const [phone, setPhoneState] = useState('+994');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
