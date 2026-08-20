import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import { ArrowLeftIcon } from '@shared/components/icons';
import { getProfile, updateProfile } from '@shared/services/profile.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { validateName, validatePassword } from '@shared/utils/validation';
import type { UserProfile } from '@typings/api';
import { FONTS } from '../../../theme/fonts';

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

  function scrollToButton() {
    scrollRef.current?.scrollToEnd({ animated: true });
  }

  function handleFieldFocus() {
    const keyboardAlreadyOpen = progress.value > 0.5;
    setTimeout(scrollToButton, keyboardAlreadyOpen ? 0 : 300);
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hesab</Text>
        <View style={styles.headerSpacer} />
      </View>

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
              onFocus={handleFieldFocus}
              error={errors.name}
            />
            <TextField
              label="Ünvan"
              placeholder="ünvan"
              value={address}
              onChangeText={setAddress}
              onFocus={handleFieldFocus}
              error={errors.address}
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
              onFocus={handleFieldFocus}
              error={errors.password}
            />
            <TextField
              label="Şifrənin təkrarı"
              secureTextEntry
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
              onFocus={handleFieldFocus}
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

const styles = StyleSheet.create({
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

export default AccountInfoScreen;
