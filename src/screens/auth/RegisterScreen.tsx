import { useRef, useState } from 'react';
import { Alert, RefreshControl, StyleSheet, Text, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import { signup } from '@shared/services/auth.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { RootStackParamList } from '@typings/navigation';
import useReload from '../../hooks/useReload';
import { FONTS } from '../../theme/fonts';
import {
  applyAzPhonePrefix,
  validateName,
  validatePassword,
  validatePhone,
} from '@shared/utils/validation';

function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { refreshing, onRefresh } = useReload();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+994');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    password?: string;
  }>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { progress } = useReanimatedKeyboardAnimation();

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
      Alert.alert('Qeydiyyat tamamlandı', 'İndi hesabınıza daxil ola bilərsiniz', [
        { text: 'Ok', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function scrollToButton() {
    scrollRef.current?.scrollToEnd({ animated: true });
  }

  function handleFieldFocus() {
    const keyboardAlreadyOpen = progress.value > 0.5;
    setTimeout(scrollToButton, keyboardAlreadyOpen ? 0 : 300);
  }

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={styles.flex}
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 96, paddingBottom: insets.bottom + 24 },
      ]}
      bottomOffset={140}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Qeydiyyatdan keç</Text>

      <View style={styles.form}>
        <TextField
          label="Ad, soyad"
          placeholder="ad soyad"
          value={name}
          onChangeText={setName}
          onFocus={handleFieldFocus}
          error={errors.name}
        />
        <TextField
          label="Telefon"
          placeholder="telefon"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => setPhone(applyAzPhonePrefix(text))}
          onFocus={handleFieldFocus}
          error={errors.phone}
        />
        <TextField
          label="Parol"
          placeholder="parol"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={handleFieldFocus}
          error={errors.password}
        />
      </View>

      <View style={styles.footer}>
        {formError ? <Text style={styles.formError}>{formError}</Text> : null}
        <Button title="Qeydiyyat" onPress={handleSubmit} loading={loading} />

        <Text style={styles.loginText}>
          Hesabınız varsa {' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Daxil olun
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: '#1A1A1A',
    marginTop: 48,
    fontFamily: FONTS.bold,
  },
  form: {
    marginTop: 48,
    gap: 20,
  },
  footer: {
    marginTop: 40,
    gap: 20,
  },
  formError: {
    fontSize: 12,
    textAlign: 'center',
    color: '#E24C4C',
    fontFamily: FONTS.regular,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
  loginLink: {
    marginLeft: 6,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});

export default RegisterScreen;
