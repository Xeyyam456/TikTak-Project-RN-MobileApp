
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import { ArrowLeftIcon, TrashIcon } from '@shared/components/icons';
import { useBasketStore } from '@shared/store/basket.store';
import type { BasketItem } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import { FONTS } from '../../../theme/fonts';

const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function BasketRow({
  item,
  onIncrement,
  onDecrement,
}: {
  item: BasketItem;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <View style={styles.row}>
      <Image
        source={{ uri: item.product.img_url || FALLBACK_IMAGE_URL }}
        style={styles.rowImage}
        resizeMode="cover"
      />
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.rowPrice}>{item.product.price} AZN</Text>
      </View>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepperButton} onPress={onDecrement}>
          {item.quantity <= 1 ? (
            <TrashIcon size={20} color="#FFFFFF" />
          ) : (
            <Text style={styles.stepperButtonText}>−</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.stepperQuantity}>{item.quantity}</Text>
        <TouchableOpacity style={styles.stepperButton} onPress={onIncrement}>
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BasketScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const basket = useBasketStore(state => state.basket);
  const loading = useBasketStore(state => state.loading);
  const fetchBasket = useBasketStore(state => state.fetchBasket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const items = basket?.items ?? [];

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
        <Text style={styles.headerTitle}>Səbətim</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading && !basket ? (
        <ActivityIndicator color="#7BC043" style={styles.loader} />
      ) : items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Səbətiniz boşdur</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {items.map(item => (
            <BasketRow
              key={item.id}
              item={item}
              onIncrement={() => addItem(item.product.id)}
              onDecrement={() => removeItem(item.product.id)}
            />
          ))}
        </ScrollView>
      )}

      {items.length > 0 && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
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
          <Button title="Sifarişi tamamla" style={styles.checkoutButton} />
        </View>
      )}
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
  loader: {
    marginTop: 32,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#B8B8C2',
    fontFamily: FONTS.medium,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  rowImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  rowInfo: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  rowPrice: {
    fontSize: 13,
    color: '#6B6B6B',
    fontFamily: FONTS.regular,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#7BC043',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  stepperButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  stepperQuantity: {
    width: 22,
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  checkoutButton: {
    backgroundColor: '#7BC043',
  },
});

export default BasketScreen;
