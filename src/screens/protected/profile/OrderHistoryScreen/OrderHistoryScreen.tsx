import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import useReload from '@shared/hooks/useReload';
import { listOrders } from '@shared/services/order.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Order } from '@typings/api';
import OrderCard, { OrderListSkeleton } from '../OrderCard';
import OrderDetailSheet from '../OrderDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './OrderHistoryScreen.styles';

function CardGap() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return <View style={styles.cardGap} />;
}

function OrderHistoryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

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
      <ScreenHeader title={t('orderHistory.title')} onBack={() => navigation.goBack()} />

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
            <Text style={styles.emptyText}>{t('orderHistory.emptyText')}</Text>
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
