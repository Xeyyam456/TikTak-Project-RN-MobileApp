import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, EyeIcon } from '@shared/components/icons';
import { listOrders } from '@shared/services/order.service';
import { formatOrderDate, getOrderStatusMeta } from '@shared/utils/order';
import type { Order } from '@typings/api';
import { FONTS } from '../../../theme/fonts';
import OrderDetailSheet from './OrderDetailSheet';

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
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 8,
  },
  cardGap: {
    height: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontFamily: FONTS.semiBold,
  },
  cardMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  date: {
    fontSize: 13,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
  total: {
    fontSize: 15,
    color: '#7BC043',
    fontFamily: FONTS.extraBold,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F0F7',
    marginVertical: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressBlock: {
    flex: 1,
    gap: 2,
  },
  addressLabel: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
  addressText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  viewButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF6DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 32,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;
