import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '@shared/components/Button';
import ConfirmModal from '@shared/components/ConfirmModal';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import { TrashIcon } from '@shared/components/icons';
import { useBasketStore } from '@shared/store/basket.store';
import type { BasketItem } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './BasketScreen.styles';

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
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const basket = useBasketStore(state => state.basket);
  const loading = useBasketStore(state => state.loading);
  const error = useBasketStore(state => state.error);
  const fetchBasket = useBasketStore(state => state.fetchBasket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);
  const clearBasket = useBasketStore(state => state.clearBasket);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const items = basket?.items ?? [];
  const [footerHeight, setFooterHeight] = useState(0);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [clearing, setClearing] = useState(false);

  async function handleConfirmClear() {
    setClearing(true);
    await clearBasket();
    setClearing(false);
    setClearModalVisible(false);
  }

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Səbətim" onBack={() => navigation.goBack()} />

      {error ? (
        <ErrorState message={error} onRetry={fetchBasket} />
      ) : loading && !basket ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : items.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIconCircle}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
              <Path
                d="M6 6l12 12M18 6L6 18"
                stroke={colors.borderMuted}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <Text style={styles.emptyStateText}>Səbətinizdə məhsul yoxdur</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.clearRow}
            onPress={() => setClearModalVisible(true)}
          >
            <Text style={styles.clearText}>Səbəti təmizlə</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.list}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: footerHeight + 16 },
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchBasket} />
            }
          >
            {items.map(item => (
              <BasketRow
                key={item.id}
                item={item}
                onIncrement={() => addItem(item.product)}
                onDecrement={() => removeItem(item.product.id)}
              />
            ))}
          </ScrollView>
        </>
      )}

      <ConfirmModal
        visible={clearModalVisible}
        icon={<TrashIcon size={28} color={colors.danger} />}
        title="Səbəti təmizlə"
        message="Səbətdəki bütün məhsulları silmək istədiyinizə əminsiniz?"
        confirmLabel="Təmizlə"
        destructive
        loading={clearing}
        onConfirm={handleConfirmClear}
        onCancel={() => setClearModalVisible(false)}
      />

      {items.length > 0 && (
        <View
          style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
          onLayout={event => setFooterHeight(event.nativeEvent.layout.height)}
        >
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
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>
      )}
    </View>
  );
}

export default BasketScreen;
