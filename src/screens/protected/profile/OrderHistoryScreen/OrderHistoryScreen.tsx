import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import { EyeIcon } from '@shared/components/icons';
import { listOrders } from '@shared/services/order.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { formatOrderDate, getOrderStatusMeta } from '@shared/utils/order';
import type { Order } from '@typings/api';
import OrderDetailSheet from '../OrderDetailSheet';
import { styles } from './OrderHistoryScreen.styles';

function CardGap() {
  return <View style={styles.cardGap} />;
}

function OrderCard({ order, onPress }: { order: Order; onPress: () => void }) {
  const status = getOrderStatusMeta(order.status);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.cardTop}>
        <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>

      <View style={styles.cardMiddle}>
        <Text style={styles.date}>{formatOrderDate(order.createdAt)}</Text>
        <Text style={styles.total}>{order.total} AZN</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBottom}>
        <View style={styles.addressBlock}>
          <Text style={styles.addressLabel}>Çatdırılma ünvanı</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {order.address}
          </Text>
        </View>
        <View style={styles.viewButton}>
          <EyeIcon size={18} color="#7BC043" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function OrderHistoryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = useCallback(() => {
    setLoading(true);
    setError(undefined);
    listOrders()
      .then(setOrders)
      .catch(err => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Sifariş tarixçəsi" onBack={() => navigation.goBack()} />

      {error ? (
        <ErrorState message={error} onRetry={loadOrders} />
      ) : loading ? (
        <ActivityIndicator color="#7BC043" style={styles.loader} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={CardGap}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Hələ sifarişiniz yoxdur</Text>
          }
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 24 },
          ]}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={() => setSelectedOrder(item)} />
          )}
        />
      )}

      <OrderDetailSheet
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </View>
  );
}

export default OrderHistoryScreen;
