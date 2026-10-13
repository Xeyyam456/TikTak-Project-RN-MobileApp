import { useMemo } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@shared/components/Button';
import TextField from '@shared/components/TextField';
import useAccountInfoForm from '../hooks/useAccountInfoForm';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './AccountInfoForm.styles';
import type { AccountInfoFormProps } from './AccountInfoForm.types';

function AccountInfoForm({ profile, refreshing, onRefresh }: AccountInfoFormProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const form = useAccountInfoForm(profile);

  return (
    <KeyboardAwareScrollView
      ref={form.scrollRef}
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
          value={form.name}
          onChangeText={form.setName}
          error={form.errors.name}
        />
        <TextField
          label={t('accountInfo.addressLabel')}
          placeholder={t('accountInfo.addressPlaceholder')}
          value={form.address}
          onChangeText={form.setAddress}
          error={form.errors.address}
        />
        <TextField
          label={t('accountInfo.emailLabel')}
          // Read-only and not sent on save — `PUT /profile` has no email field.
          value={profile?.email ?? ''}
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
          value={form.password}
          onChangeText={form.setPassword}
          onFocus={form.handlePasswordFieldFocus}
          error={form.errors.password}
        />
        <TextField
          label={t('accountInfo.passwordRepeatLabel')}
          secureTextEntry
          value={form.passwordRepeat}
          onChangeText={form.setPasswordRepeat}
          onFocus={form.handlePasswordFieldFocus}
          error={form.errors.passwordRepeat}
        />
      </View>

      {form.formError ? (
        <Text style={styles.formError}>{form.formError}</Text>
      ) : null}
      <Button
        title={t('accountInfo.save')}
        onPress={form.handleSubmit}
        loading={form.saving}
        style={styles.submitButton}
      />
    </KeyboardAwareScrollView>
  );
}

export default AccountInfoForm;
