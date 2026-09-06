import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '@shared/components/Input';
import PaymentMethodPicker from '../PaymentMethodPicker';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CheckoutForm.styles';
import type { CheckoutFormProps } from './CheckoutForm.types';

// Name/address/phone are read-only here: they come from the profile and
// are edited on the account screen, not mid-checkout.
function CheckoutForm({
  profile,
  note,
  onNoteChange,
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutFormProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  return (
    <View style={styles.formSection}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{t('checkout.nameLabel')}</Text>
        <Text style={styles.fieldValue}>{profile?.full_name ?? '—'}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{t('checkout.addressLabel')}</Text>
        <Text style={styles.fieldValue}>{profile?.address || '—'}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{t('checkout.phoneLabel')}</Text>
        <Text style={styles.fieldValue}>{profile?.phone ?? '—'}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{t('checkout.noteLabel')}</Text>
        <Input
          value={note}
          onChangeText={onNoteChange}
          multiline
          style={styles.noteInput}
        />
      </View>

      <PaymentMethodPicker value={paymentMethod} onChange={onPaymentMethodChange} />
    </View>
  );
}

export default CheckoutForm;
