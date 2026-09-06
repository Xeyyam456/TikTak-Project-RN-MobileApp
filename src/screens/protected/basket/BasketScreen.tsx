import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import { useBasketStore } from '@shared/store/basket.store';
import type { RootStackParamList } from '@typings/navigation';
import BasketEmptyState from './BasketEmptyState';
import BasketFooter from './BasketFooter';
import BasketRow from './BasketRow';
import ClearBasketModal from './ClearBasketModal';
import { useTheme } from '../../../theme/ThemeContext';
import { createStyles } from './BasketScreen.styles';

function BasketScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const basket = useBasketStore(state => state.basket);
  const loading = useBasketStore(state => state.loading);
  const error = useBasketStore(state => state.error);
  const fetchBasket = useBasketStore(state => state.fetchBasket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const items = basket?.items ?? [];
  const [footerHeight, setFooterHeight] = useState(0);
  const [clearModalVisible, setClearModalVisible] = useState(false);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('basket.title')} onBack={() => navigation.goBack()} />

      {error ? (
        <ErrorState message={error} onRetry={fetchBasket} />
      ) : loading && !basket ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : items.length === 0 ? (
        <BasketEmptyState />
      ) : (
        <>
          <TouchableOpacity
            style={styles.clearRow}
            onPress={() => setClearModalVisible(true)}
          >
            <Text style={styles.clearText}>{t('basket.clearAll')}</Text>
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

      <ClearBasketModal
        visible={clearModalVisible}
        onClose={() => setClearModalVisible(false)}
      />

      {items.length > 0 && (
        <BasketFooter
          total={basket?.total}
          onCheckout={() => navigation.navigate('Checkout')}
          onHeightChange={setFooterHeight}
        />
      )}
    </View>
  );
}

export default BasketScreen;
