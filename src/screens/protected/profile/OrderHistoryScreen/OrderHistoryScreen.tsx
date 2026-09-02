import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import Skeleton from '@shared/components/Skeleton';
import { EyeIcon } from '@shared/components/icons';
import useReload from '@shared/hooks/useReload';
import { listOrders } from '@shared/services/order.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { formatOrderDate, getOrderStatusMeta } from '@shared/utils/order';
import type { Order } from '@typings/api';
import OrderDetailSheet from '../OrderDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './OrderHistoryScreen.styles';

function CardGap() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return <View style={styles.cardGap} />;
}

function OrderCard({ order, onPress }: { order: Order; onPress: () => void }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
          <EyeIcon size={18} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const SKELETON_COUNT = 4;

function OrderCardSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Skeleton width={90} height={16} />
        <Skeleton width={70} height={22} borderRadius={20} />
      </View>
      <View style={styles.cardMiddle}>
        <Skeleton width={110} height={14} />
        <Skeleton width={60} height={16} />
      </View>
      <View style={styles.divider} />
      <View style={styles.cardBottom}>
        <View style={styles.addressBlock}>
          <Skeleton width={100} height={12} style={{ marginBottom: 6 }} />
          <Skeleton width="80%" height={14} />
        </View>
        <Skeleton width={34} height={34} borderRadius={17} />
      </View>
    </View>
  );
}

function OrderListSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.skeletonList}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View key={index} style={index > 0 ? { marginTop: 12 } : undefined}>
          <OrderCardSkeleton />
        </View>
      ))}
    </View>
  );
}

function OrderHistoryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    data: orders = [],
    isPending: loading,
    error: queryError,
    refetch,
  } = useQuery({ queryKey: queryKeys.orders, queryFn: listOrders });
  const error = queryError ? getApiErrorMessage(queryError) : undefined;
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { refreshing, onRefresh } = useReload(refetch);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Sifariş tarixçəsi" onBack={() => navigation.goBack()} />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading && orders.length === 0 ? (
        <OrderListSkeleton />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
