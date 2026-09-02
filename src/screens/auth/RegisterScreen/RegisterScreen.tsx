import { useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthSwitchLink from '@shared/components/AuthSwitchLink';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import { signup } from '@shared/services/auth.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
import type { RootStackParamList } from '@typings/navigation';
import {
  applyAzPhonePrefix,
  validateName,
  validatePassword,
  validatePhone,
} from '@shared/utils/validation';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './RegisterScreen.styles';

function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

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
      showSuccessToast(t('register.successToast'));
      navigation.navigate('Login');
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
    >
      <Text style={styles.title}>{t('register.title')}</Text>

      <View style={styles.form}>
        <TextField
          label={t('register.nameLabel')}
          placeholder={t('register.namePlaceholder')}
          value={name}
          onChangeText={setName}
          onFocus={handleFieldFocus}
          error={errors.name}
        />
        <TextField
          label={t('register.phoneLabel')}
          placeholder={t('register.phonePlaceholder')}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => setPhone(applyAzPhonePrefix(text))}
          onFocus={handleFieldFocus}
          error={errors.phone}
        />
        <TextField
          label={t('register.passwordLabel')}
          placeholder={t('register.passwordPlaceholder')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={handleFieldFocus}
          error={errors.password}
        />
      </View>

      <View style={styles.footer}>
        {formError ? <Text style={styles.formError}>{formError}</Text> : null}
        <Button title={t('register.submit')} onPress={handleSubmit} loading={loading} />

        <AuthSwitchLink
          promptText={t('register.haveAccount')}
          linkText={t('register.login')}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default RegisterScreen;
