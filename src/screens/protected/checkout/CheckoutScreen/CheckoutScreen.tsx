import { useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import { checkout } from '@shared/services/order.service';
import { getProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { PaymentMethod } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import CheckoutFooter from '../CheckoutFooter';
import CheckoutForm from '../CheckoutForm';
import OrderItemsBox from '../OrderItemsBox';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CheckoutScreen.styles';

function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

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
      const order = await checkout({
        paymentMethod,
        address: profile.address ?? '',
        phone: profile.phone,
        note: note || undefined,
      });
      await fetchBasket();
      navigation.navigate('OrderSuccess', { orderNumber: order.orderNumber });
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
          <CheckoutForm
            profile={profile}
            note={note}
            onNoteChange={setNote}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />

          <OrderItemsBox items={items} />

          <CheckoutFooter
            total={basket?.total}
            submitting={submitting}
            disabled={!profile || items.length === 0}
            error={submitError}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </View>
  );
}

export default CheckoutScreen;
