import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketSummaryBar, {
  SUMMARY_BAR_GAP,
  SUMMARY_BAR_HEIGHT,
  SUMMARY_BAR_TOP_GAP,
} from '@shared/components/BasketSummaryBar';
import ErrorState from '@shared/components/ErrorState';
import ProductCard, { COLUMNS } from '@shared/components/ProductCard';
import ScreenHeader from '@shared/components/ScreenHeader';
import { listFavorites } from '@shared/services/product.service';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Product } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import useReload from '../../../../hooks/useReload';
import ProductDetailSheet from '../../home/ProductDetailSheet';
import { styles } from './MyListsScreen.styles';

function MyListsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const basket = useBasketStore(state => state.basket);
  const fetchBasket = useBasketStore(state => state.fetchBasket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  const loadFavorites = useCallback(() => {
    setLoading(true);
    setError(undefined);
    Promise.all([listFavorites(), fetchBasket()])
      .then(([favoriteList]) => setFavorites(favoriteList))
      .catch(err => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [fetchBasket]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const { refreshing, onRefresh } = useReload(loadFavorites);

  function quantityFor(productId: number) {
    return quantityForProduct(basket, productId);
  }

  async function handleAdd(productId: number) {
    await addItem(productId);
  }

  async function handleDecrement(productId: number) {
    await removeItem(productId);
  }

  const basketItemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const showSummaryBar = basketItemCount > 0;

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title="Siyahılarım" onBack={() => navigation.goBack()} />

      {error ? (
        <ErrorState message={error} onRetry={loadFavorites} />
      ) : loading && favorites.length === 0 ? (
        <ActivityIndicator color="#7BC043" style={styles.loader} />
      ) : (
        <FlashList<Product>
          data={favorites}
          extraData={basket}
          keyExtractor={item => String(item.id)}
          numColumns={COLUMNS}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Siyahınız boşdur</Text>
          }
          style={
            showSummaryBar && {
              marginBottom:
                SUMMARY_BAR_HEIGHT + SUMMARY_BAR_GAP + SUMMARY_BAR_TOP_GAP,
            }
          }
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 24 },
          ]}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.cardWrapper,
                index % COLUMNS !== 0 && styles.cardWrapperRight,
              ]}
            >
              <ProductCard
                product={item}
                quantity={quantityFor(item.id)}
                onPress={() => setSelectedProduct(item)}
                onAdd={() => handleAdd(item.id)}
                onIncrement={() => handleAdd(item.id)}
                onDecrement={() => handleDecrement(item.id)}
              />
            </View>
          )}
        />
      )}

      <ProductDetailSheet
        product={selectedProduct}
        quantity={selectedProduct ? quantityFor(selectedProduct.id) : 0}
        onClose={() => setSelectedProduct(null)}
        onAdd={() => selectedProduct && handleAdd(selectedProduct.id)}
        onFavoriteChange={(productId, isFavorite) => {
          if (!isFavorite) {
            setFavorites(current => current.filter(p => p.id !== productId));
            return;
          }
          // Re-favorited within the same sheet session — put it back
          // instead of requiring a full re-fetch to see it again.
          setFavorites(current => {
            if (current.some(p => p.id === productId)) return current;
            if (!selectedProduct || selectedProduct.id !== productId) return current;
            return [selectedProduct, ...current];
          });
        }}
      />

      {showSummaryBar && (
        <BasketSummaryBar
          itemCount={basketItemCount}
          total={basket?.total}
          onPress={() => navigation.navigate('Basket')}
        />
      )}
    </View>
  );
}

export default MyListsScreen;
