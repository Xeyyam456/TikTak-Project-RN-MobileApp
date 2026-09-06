import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthSwitchLink from '@shared/components/AuthSwitchLink';
import Button from '@shared/components/Button';
import Checkbox from '@shared/components/Checkbox';
import TextField from '@shared/components/TextField';
import type { RootStackParamList } from '@typings/navigation';
import useLoginForm from '../../hooks/useLoginForm';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './LoginScreen.styles';

function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const {
    phone,
    setPhone,
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
  } = useLoginForm();

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
      <Text style={styles.title}>{t('login.title')}</Text>

      <View style={styles.form}>
        <TextField
          label={t('login.phoneLabel')}
          placeholder={t('login.phonePlaceholder')}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          onFocus={handleFieldFocus}
          error={errors.phone}
        />
        <TextField
          label={t('login.passwordLabel')}
          placeholder={t('login.passwordPlaceholder')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={handleFieldFocus}
          error={errors.password}
        />
        <Checkbox
          label={t('login.rememberMe')}
          checked={rememberMe}
          onChange={setRememberMe}
        />
      </View>

      <View style={styles.footer}>
        {formError ? <Text style={styles.formError}>{formError}</Text> : null}
        <Button title={t('login.submit')} onPress={handleSubmit} loading={loading} />

        <AuthSwitchLink
          promptText={t('login.noAccount')}
          linkText={t('login.signUp')}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;
