import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { PaymentMethod } from '@typings/api';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './PaymentMethodPicker.styles';

type PaymentMethodPickerProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

function PaymentMethodPicker({ value, onChange }: PaymentMethodPickerProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  // Built inside the component (not a module-level const) because t()
  // needs to be called from within a component/hook.
  const options: { value: PaymentMethod; label: string }[] = [
    { value: 'CASH', label: t('checkout.cashOnDelivery') },
    { value: 'CARD', label: t('checkout.cardOnDelivery') },
  ];

  return (
    <View style={styles.paymentOptions}>
      {options.map(option => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={styles.paymentOption}
            onPress={() => onChange(option.value)}
          >
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.paymentLabel}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default PaymentMethodPicker;
