import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthSwitchLink from '@shared/components/AuthSwitchLink';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import type { RootStackParamList } from '@typings/navigation';
import useRegisterForm from '../../hooks/useRegisterForm';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './RegisterScreen.styles';

function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const {
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    errors,
    formError,
    loading,
    scrollRef,
    handleFieldFocus,
    handleSubmit,
  } = useRegisterForm();

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
          onChangeText={setPhone}
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
