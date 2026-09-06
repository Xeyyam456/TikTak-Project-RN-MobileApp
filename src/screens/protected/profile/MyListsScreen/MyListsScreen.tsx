import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketSummaryBar from '@shared/components/BasketSummaryBar';
import ErrorState from '@shared/components/ErrorState';
import ProductGrid from '@shared/components/ProductGrid';
import ProductGridSkeleton from '@shared/components/ProductGridSkeleton';
import ScreenHeader from '@shared/components/ScreenHeader';
import { useBasketGrid } from '@shared/hooks/useBasketGrid';
import type { Product } from '@typings/api';
import type { RootStackParamList } from '@typings/navigation';
import ProductDetailSheet from '../../home/ProductDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './MyListsScreen.styles';
import { useFavorites } from '../hooks/useFavorites';

function MyListsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    favorites,
    isEmptyFirstLoad,
    error,
    refetch,
    refreshing,
    onRefresh,
    onFavoriteChange,
  } = useFavorites(selectedProduct);
  const basketGrid = useBasketGrid();

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('myLists.title')} onBack={() => navigation.goBack()} />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : isEmptyFirstLoad ? (
        <ProductGridSkeleton paddingTop={16} />
      ) : (
        <ProductGrid
          products={favorites}
          basket={basketGrid.basket}
          quantityFor={basketGrid.quantityFor}
          onProductPress={setSelectedProduct}
          onAdd={basketGrid.addItem}
          onDecrement={basketGrid.removeItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          emptyComponent={
            <Text style={styles.emptyText}>{t('myLists.emptyText')}</Text>
          }
          bottomInset={insets.bottom}
          reserveSummaryBar={basketGrid.showSummaryBar}
        />
      )}

      <ProductDetailSheet
        product={selectedProduct}
        quantity={selectedProduct ? basketGrid.quantityFor(selectedProduct.id) : 0}
        onClose={() => setSelectedProduct(null)}
        onAdd={() => selectedProduct && basketGrid.addItem(selectedProduct)}
        onFavoriteChange={onFavoriteChange}
      />

      {basketGrid.showSummaryBar && (
        <BasketSummaryBar
          itemCount={basketGrid.basketItemCount}
          total={basketGrid.basket?.total}
          onPress={() => navigation.navigate('Basket')}
        />
      )}
    </View>
  );
}

export default MyListsScreen;
