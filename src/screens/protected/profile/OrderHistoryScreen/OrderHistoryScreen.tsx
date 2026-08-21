import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, EyeIcon } from '@shared/components/icons';
import { listOrders } from '@shared/services/order.service';
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    listOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

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
        <Text style={styles.headerTitle}>Sifariş tarixçəsi</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
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
