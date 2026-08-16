import { useRef, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
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
import type { RootStackParamList } from '@typings/navigation';
import useReload from '../../hooks/useReload';
import { FONTS } from '../../theme/fonts';
import { validatePassword, validatePhone } from '@shared/utils/validation';

function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { refreshing, onRefresh } = useReload();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>(
    {},
  );

  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { progress } = useReanimatedKeyboardAnimation();

  function handleSubmit() {
    const nextErrors = {
      phone: validatePhone(phone),
      password: validatePassword(password),
    };
    setErrors(nextErrors);
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
      <Text style={styles.title}>Daxil ol</Text>

      <View style={styles.form}>
        <TextField
          label="Telefon"
          placeholder="telefon"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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
        <Button title="Daxil ol" onPress={handleSubmit} />

        <Text style={styles.registerText}>
          Hesabınız yoxdursa {' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            Qeydiyyatdan keç
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
  registerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: FONTS.regular,
  },
  registerLink: {
    marginLeft: 6,
    color: '#7BC043',
    fontFamily: FONTS.semiBold,
  },
});

export default LoginScreen;
