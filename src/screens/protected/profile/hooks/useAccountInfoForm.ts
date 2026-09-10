import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import { validateName, validatePassword } from '@shared/utils/validation';
import type { UserProfile } from '@typings/api';

/** Editable profile fields, their validation and the save request. */
export default function useAccountInfoForm(profile: UserProfile | undefined) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    address?: string;
    password?: string;
    passwordRepeat?: string;
  }>({});
  const [formError, setFormError] = useState<string>();
  const [saving, setSaving] = useState(false);

  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { progress } = useReanimatedKeyboardAnimation();

  useEffect(() => {
    if (!profile) return;
    setName(profile.full_name);
    setAddress(profile.address ?? '');
  }, [profile]);

  // Only the password fields (near the bottom, right above the button) get
  // the scroll-to-end nudge — applying it to every field also pushed
  // "Ünvan" (near the top) off-screen behind the keyboard when focused.
  function handlePasswordFieldFocus() {
    const keyboardAlreadyOpen = progress.value > 0.5;
    setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: true }),
      keyboardAlreadyOpen ? 0 : 300,
    );
  }

  async function handleSubmit() {
    // Password fields are optional here — only validate/send them if the
    // user actually started filling one in.
    const changingPassword = !!(password || passwordRepeat);
    const nextErrors = {
      name: validateName(name),
      address: address.trim() ? undefined : t('accountInfo.addressRequired'),
      password: changingPassword ? validatePassword(password) : undefined,
      passwordRepeat:
        changingPassword && password !== passwordRepeat
          ? t('accountInfo.passwordMismatch')
          : undefined,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setFormError(undefined);
    setSaving(true);
    try {
      const updated = await updateProfile({
        full_name: name.trim(),
        address: address.trim(),
        ...(changingPassword
          ? { password, password_repeat: passwordRepeat }
          : {}),
      });
      queryClient.setQueryData(queryKeys.profile, updated);
      setPassword('');
      setPasswordRepeat('');
      const successKey = changingPassword
        ? 'accountInfo.passwordChangedToast'
        : 'accountInfo.saveSuccessToast';
      showSuccessToast(t(successKey));
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return {
    name,
    setName,
    address,
    setAddress,
    password,
    setPassword,
    passwordRepeat,
    setPasswordRepeat,
    errors,
    formError,
    saving,
    scrollRef,
    handlePasswordFieldFocus,
    handleSubmit,
  };
}
