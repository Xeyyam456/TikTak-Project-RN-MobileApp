import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signup } from '@shared/services/auth.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import {
  applyAzPhonePrefix,
  validateName,
  validatePassword,
  validatePhone,
} from '@shared/utils/validation';
import type { RootStackParamList } from '@typings/navigation';
import useAuthFormScroll from './useAuthFormScroll';

/** Signup form state, validation and the create-account request. */
export default function useRegisterForm() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { scrollRef, handleFieldFocus } = useAuthFormScroll();

  const [name, setName] = useState('');
  const [phone, setPhoneState] = useState('+994');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    password?: string;
  }>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const nextErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
      password: validatePassword(password),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setFormError(undefined);
    setLoading(true);
    try {
      await signup({ full_name: name, phone, password });
      showSuccessToast(t('register.successToast'));
      navigation.navigate('Login');
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    setName,
    phone,
    setPhone: (text: string) => setPhoneState(applyAzPhonePrefix(text)),
    password,
    setPassword,
    errors,
    formError,
    loading,
    scrollRef,
    handleFieldFocus,
    handleSubmit,
  };
}
