import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketSummaryBar from '@shared/components/BasketSummaryBar';
import ErrorState from '@shared/components/ErrorState';
import ProductGrid from '@shared/components/ProductGrid';
import ProductGridSkeleton from '@shared/components/ProductGridSkeleton';
import { useBasketGrid } from '@shared/hooks/useBasketGrid';
import type { Product } from '@typings/api';
import type { HomeStackParamList, RootStackParamList } from '@typings/navigation';
import BackToCategoriesButton from '../BackToCategoriesButton';
import CategoryChipsRow from '../CategoryChipsRow';
import EmptyCategoryState from '../EmptyCategoryState';
import ProductDetailSheet from '../ProductDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CategoryProductsScreen.styles';
import { useCategoryProductsScreen } from '../hooks/useCategoryProductsScreen';

function CategoryProductsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'CategoryProducts'>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    selectedCategoryId,
    selectCategory,
    listRef,
    chips,
    categories,
    visibleProducts,
    isEmptyFirstLoad,
    error,
    retry,
    refreshing,
    onRefresh,
  } = useCategoryProductsScreen(route.params.categoryId);
  const basketGrid = useBasketGrid();

  function goToBasket() {
    (
      navigation as unknown as NativeStackNavigationProp<RootStackParamList>
    ).navigate('Basket');
  }

  return (
    <View style={styles.flex}>
      <BackToCategoriesButton onPress={() => navigation.navigate('HomeMain')} />

      <CategoryChipsRow
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelect={selectCategory}
        chipsScrollRef={chips.chipsScrollRef}
        onChipsContentSizeChange={chips.onChipsContentSizeChange}
        onChipLayout={chips.onChipLayout}
      />

      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : isEmptyFirstLoad ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid
          listRef={listRef}
          products={visibleProducts}
          basket={basketGrid.basket}
          quantityFor={basketGrid.quantityFor}
          onProductPress={setSelectedProduct}
          onAdd={basketGrid.addItem}
          onDecrement={basketGrid.removeItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          emptyComponent={EmptyCategoryState}
          bottomInset={insets.bottom}
          reserveSummaryBar={basketGrid.showSummaryBar}
          onLoad={() => listRef.current?.scrollToTop({ animated: false })}
          style={styles.list}
        />
      )}

      <ProductDetailSheet
        product={selectedProduct}
        quantity={selectedProduct ? basketGrid.quantityFor(selectedProduct.id) : 0}
        onClose={() => setSelectedProduct(null)}
        onAdd={() => selectedProduct && basketGrid.addItem(selectedProduct)}
      />

      {basketGrid.showSummaryBar && (
        <BasketSummaryBar
          itemCount={basketGrid.basketItemCount}
          total={basketGrid.basket?.total}
          onPress={goToBasket}
        />
      )}
    </View>
  );
}

export default CategoryProductsScreen;
