import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '@shared/components/Button';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import TextField from '@shared/components/TextField';
import useReload from '@shared/hooks/useReload';
import { getProfile, updateProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { validateName, validatePassword } from '@shared/utils/validation';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './AccountInfoScreen.styles';

// Not editable and not sent on save — the backend's `PUT /profile` has no
// email field (docs/api.md, `UserProfile` type), so there's nowhere for a
// user-entered value to persist yet. Fixed placeholder for design fidelity
// until the API supports it, same treatment as the read-only phone field.
const PLACEHOLDER_EMAIL = 'Xeyyamelizade5@gmail.com';

function AccountInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const {
    data: profile,
    isPending: loading,
    error: queryError,
    refetch,
  } = useQuery({ queryKey: queryKeys.profile, queryFn: getProfile });
  const loadError = queryError ? getApiErrorMessage(queryError) : undefined;
  const [saving, setSaving] = useState(false);

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

  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { progress } = useReanimatedKeyboardAnimation();

  useEffect(() => {
    if (!profile) return;
    setName(profile.full_name);
    setAddress(profile.address ?? '');
  }, [profile]);

  const { refreshing, onRefresh } = useReload(refetch);

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
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('accountInfo.title')} onBack={() => navigation.goBack()} />

      {loadError ? (
        <ErrorState message={loadError} onRetry={refetch} />
      ) : loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : (
        <KeyboardAwareScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 24 },
          ]}
          bottomOffset={140}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.form}>
            <TextField
              label={t('accountInfo.nameLabel')}
              placeholder={t('accountInfo.namePlaceholder')}
              value={name}
              onChangeText={setName}
              error={errors.name}
            />
            <TextField
              label={t('accountInfo.addressLabel')}
              placeholder={t('accountInfo.addressPlaceholder')}
              value={address}
              onChangeText={setAddress}
              error={errors.address}
            />
            <TextField
              label={t('accountInfo.emailLabel')}
              value={PLACEHOLDER_EMAIL}
              editable={false}
              style={styles.disabledInput}
            />
            <TextField
              label={t('accountInfo.phoneLabel')}
              value={profile?.phone}
              editable={false}
              style={styles.disabledInput}
            />
            <TextField
              label={t('accountInfo.passwordLabel')}
              placeholder={t('accountInfo.passwordPlaceholder')}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={handlePasswordFieldFocus}
              error={errors.password}
            />
            <TextField
              label={t('accountInfo.passwordRepeatLabel')}
              secureTextEntry
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
              onFocus={handlePasswordFieldFocus}
              error={errors.passwordRepeat}
            />
          </View>

          {formError ? <Text style={styles.formError}>{formError}</Text> : null}
          <Button
            title={t('accountInfo.save')}
            onPress={handleSubmit}
            loading={saving}
            style={styles.submitButton}
          />
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}

export default AccountInfoScreen;
