import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import Input from '@shared/components/Input';
import ScreenHeader from '@shared/components/ScreenHeader';
import { checkout } from '@shared/services/order.service';
import { getProfile } from '@shared/services/profile.service';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { PaymentMethod, UserProfile } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import { styles } from './CheckoutScreen.styles';

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'CASH', label: 'Qapıda nağd' },
  { value: 'CARD', label: 'Qapıda kart' },
];

function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const basket = useBasketStore(state => state.basket);
  const fetchBasket = useBasketStore(state => state.fetchBasket);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [submitting, setSubmitting] = useState(false);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const items = basket?.items ?? [];

  async function handleSubmit() {
    if (!profile) return;
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
      Alert.alert('Xəta', getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Sifarişi tamamla" onBack={() => navigation.goBack()} />

      <View style={styles.formSection}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Adınız</Text>
          <Text style={styles.fieldValue}>{profile?.full_name ?? '—'}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Ünvaniniz</Text>
          <Text style={styles.fieldValue}>{profile?.address || '—'}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Telefon</Text>
          <Text style={styles.fieldValue}>{profile?.phone ?? '—'}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Əlavə qeydiniz</Text>
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

      <View
        style={[
          styles.orderItemsBox,
          boxHeight !== undefined && styles.orderItemsBoxFixed,
          boxHeight !== undefined && { height: boxHeight },
        ]}
        onLayout={event => {
          if (boxHeight === undefined) {
            setBoxHeight(event.nativeEvent.layout.height);
          }
        }}
      >
        <View style={styles.orderItemsBoxBackground} />
        <ScrollView
          style={styles.orderItemsScroll}
          contentContainerStyle={styles.orderItemsContent}
          showsVerticalScrollIndicator={false}
        >
          {items.map(item => (
            <View key={item.id} style={styles.orderItemRow}>
              <Text style={styles.orderItemLabel} numberOfLines={1}>
                {item.quantity} x {item.product.title}
              </Text>
              <Text style={styles.orderItemPrice}>{item.total_price} AZN</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerDivider} />
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Ümumi: {basket?.total} AZN</Text>
            <Text style={styles.summaryLabel}>Çatırılma: Pulsuz</Text>
          </View>
          <View style={styles.summaryTotalWrapper}>
            <Text style={styles.summaryTotalLabel}>Yekun məbləğ:</Text>
            <Text style={styles.summaryTotalValue}>{basket?.total} AZN</Text>
          </View>
        </View>
        <Button
          title="Sifarişi tamamla"
          loading={submitting}
          disabled={!profile || items.length === 0}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

export default CheckoutScreen;
