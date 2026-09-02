import { useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import Button from '@shared/components/Button';
import ErrorState from '@shared/components/ErrorState';
import Input from '@shared/components/Input';
import ScreenHeader from '@shared/components/ScreenHeader';
import { checkout } from '@shared/services/order.service';
import { getProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { PaymentMethod } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import OrderItemsBox from '../OrderItemsBox';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CheckoutScreen.styles';

function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  // Built inside the component (not a module-level const) because t()
  // needs to be called from within a component/hook.
  const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
    { value: 'CASH', label: t('checkout.cashOnDelivery') },
    { value: 'CARD', label: t('checkout.cardOnDelivery') },
  ];

  const basket = useBasketStore(state => state.basket);
  const fetchBasket = useBasketStore(state => state.fetchBasket);

  const {
    data: profile,
    isPending: loadingProfile,
    error: profileQueryError,
    refetch: loadProfile,
  } = useQuery({ queryKey: queryKeys.profile, queryFn: getProfile });
  const profileError = profileQueryError
    ? getApiErrorMessage(profileQueryError)
    : undefined;
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const items = basket?.items ?? [];

  async function handleSubmit() {
    if (!profile) return;
    setSubmitError(undefined);
    setSubmitting(true);
    try {
      await checkout({
        paymentMethod,
        address: profile.address ?? '',
        phone: profile.phone,
        note: note || undefined,
      });
      await fetchBasket();
      navigation.navigate('OrderSuccess');
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('checkout.title')} onBack={() => navigation.goBack()} />

      {profileError ? (
        <ErrorState message={profileError} onRetry={loadProfile} />
      ) : loadingProfile ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : (
        <>
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
                onChangeText={setNote}
                multiline
                style={styles.noteInput}
              />
            </View>

            <View style={styles.paymentOptions}>
              {PAYMENT_OPTIONS.map(option => {
                const selected = option.value === paymentMethod;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.paymentOption}
                    onPress={() => setPaymentMethod(option.value)}
                  >
                    <View style={[styles.radio, selected && styles.radioSelected]}>
                      {selected && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.paymentLabel}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <OrderItemsBox items={items} />

          <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.footerDivider} />
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryLabel}>
                  {t('checkout.subtotal', { total: basket?.total })}
                </Text>
                <Text style={styles.summaryLabel}>{t('checkout.deliveryFree')}</Text>
              </View>
              <View style={styles.summaryTotalWrapper}>
                <Text style={styles.summaryTotalLabel}>{t('checkout.finalTotalLabel')}</Text>
                <Text style={styles.summaryTotalValue}>{basket?.total} AZN</Text>
              </View>
            </View>
            {submitError ? <Text style={styles.formError}>{submitError}</Text> : null}
            <Button
              title={t('checkout.submit')}
              loading={submitting}
              disabled={!profile || items.length === 0}
              onPress={handleSubmit}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default CheckoutScreen;
