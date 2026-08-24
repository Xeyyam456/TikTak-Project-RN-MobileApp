import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '@shared/components/Button';
import ScreenHeader from '@shared/components/ScreenHeader';
import TextField from '@shared/components/TextField';
import { getProfile, updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { validateName, validatePassword } from '@shared/utils/validation';
import type { UserProfile } from '@typings/api';
import { styles } from './AccountInfoScreen.styles';

// Not editable and not sent on save — the backend's `PUT /profile` has no
// email field (docs/api.md, `UserProfile` type), so there's nowhere for a
// user-entered value to persist yet. Fixed placeholder for design fidelity
// until the API supports it, same treatment as the read-only phone field.
const PLACEHOLDER_EMAIL = 'Xeyyamelizade5@gmail.com';

function AccountInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [profile, setProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
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
    getProfile()
      .then(data => {
        setProfile(data);
        setName(data.full_name);
        setAddress(data.address ?? '');
      })
      .finally(() => setLoading(false));
  }, []);

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
      address: address.trim() ? undefined : 'Ünvan daxil edin',
      password: changingPassword ? validatePassword(password) : undefined,
      passwordRepeat:
        changingPassword && password !== passwordRepeat
          ? 'Şifrələr uyğun gəlmir'
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
      setProfile(updated);
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
      <ScreenHeader title="Hesab" onBack={() => navigation.goBack()} />

      {!loading && (
        <KeyboardAwareScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 24 },
          ]}
          bottomOffset={140}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <TextField
              label="Ad Soyad"
              placeholder="Ad, Soyad"
              value={name}
              onChangeText={setName}
              error={errors.name}
            />
            <TextField
              label="Ünvan"
              placeholder="ünvan"
              value={address}
              onChangeText={setAddress}
              error={errors.address}
            />
            <TextField
              label="E-mail"
              value={PLACEHOLDER_EMAIL}
              editable={false}
              style={styles.disabledInput}
            />
            <TextField
              label="Telefon nömrəsi"
              value={profile?.phone}
              editable={false}
              style={styles.disabledInput}
            />
            <TextField
              label="Şifrə"
              placeholder="Yeni şifrə (dəyişmək istəməsəniz boş buraxın)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={handlePasswordFieldFocus}
              error={errors.password}
            />
            <TextField
              label="Şifrənin təkrarı"
              secureTextEntry
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
              onFocus={handlePasswordFieldFocus}
              error={errors.passwordRepeat}
            />
          </View>

          {formError ? <Text style={styles.formError}>{formError}</Text> : null}
          <Button
            title="Yadda saxla"
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
