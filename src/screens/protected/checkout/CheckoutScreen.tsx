import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import Input from '@shared/components/Input';
import { ArrowLeftIcon } from '@shared/components/icons';
import { checkout } from '@shared/services/order.service';
import { getProfile } from '@shared/services/profile.service';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { PaymentMethod, UserProfile } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import { FONTS } from '../../../theme/fonts';

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'CASH', label: 'Qapıda nağd' },
  { value: 'CARD', label: 'Qapıda kart' },
];

const ORDER_ROW_HEIGHT = 30;
const ORDER_ROW_GAP = 4;

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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sifarişi tamamla</Text>
        <View style={styles.headerSpacer} />
      </View>

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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  backButton: {
    width: 32,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  formSection: {
    paddingHorizontal: 15,
    paddingTop: 8,
    gap: 20,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  fieldValue: {
    fontSize: 14,
    color: '#6B6B6B',
    fontFamily: FONTS.regular,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  paymentOptions: {
    gap: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D8D8E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#7BC043',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7BC043',
  },
  paymentLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
  },
  orderItemsBox: {
    flex: 1,
    marginTop: 17,
    marginBottom: 6,
    marginHorizontal: 15,
  },
  orderItemsBoxFixed: {
    flex: 0,
  },
  orderItemsBoxBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#b8bbb5',
    borderRadius: 12,
  },
  orderItemsScroll: {
    flex: 1,
  },
  orderItemsContent: {
    paddingLeft: 8,
    paddingRight: 15,
    paddingVertical: 14,
    gap: ORDER_ROW_GAP,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    height: ORDER_ROW_HEIGHT,
  },
  orderItemLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: ORDER_ROW_HEIGHT,
    color: '#1A1A1A',
    fontFamily: FONTS.regular,
  },
  orderItemPrice: {
    fontSize: 13,
    lineHeight: ORDER_ROW_HEIGHT,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6B6B6B',
    fontFamily: FONTS.regular,
  },
  summaryTotalWrapper: {
    alignItems: 'flex-end',
  },
  summaryTotalLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  summaryTotalValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
});

export default CheckoutScreen;
