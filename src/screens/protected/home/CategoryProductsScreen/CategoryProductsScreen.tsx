import { useMemo, useRef, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlashList, type FlashListRef } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasketSummaryBar, {
  SUMMARY_BAR_GAP,
  SUMMARY_BAR_HEIGHT,
  SUMMARY_BAR_TOP_GAP,
} from '@shared/components/BasketSummaryBar';
import ErrorState from '@shared/components/ErrorState';
import ProductCard, { COLUMNS } from '@shared/components/ProductCard';
import ProductCardSkeleton from '@shared/components/ProductCardSkeleton';
import { GridIcon } from '@shared/components/icons';
import useReload from '@shared/hooks/useReload';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import type { Product } from '@typings/api';
import type { HomeStackParamList, RootStackParamList } from '@typings/navigation';
import EmptyCategoryState from '../EmptyCategoryState';
import ProductDetailSheet from '../ProductDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './CategoryProductsScreen.styles';
import { useCategoryChipsScroll } from './useCategoryChipsScroll';
import { useCategoryProductsData } from './useCategoryProductsData';

const SKELETON_COUNT = 6;

function ProductGridSkeleton() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.skeletonGrid}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View
          key={index}
          style={[styles.cardWrapper, index % COLUMNS !== 0 && styles.cardWrapperRight]}
        >
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
}

function CategoryProductsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route =
    useRoute<RouteProp<HomeStackParamList, 'CategoryProducts'>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    route.params.categoryId,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const listRef = useRef<FlashListRef<Product>>(null);
  const { chipsScrollRef, onChipsContentSizeChange, onChipLayout, scrollToChip } =
    useCategoryChipsScroll(selectedCategoryId);
  const { categories, products, loading, error, retry } =
    useCategoryProductsData();
  const { refreshing, onRefresh } = useReload(retry);

  const basket = useBasketStore(state => state.basket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  function quantityFor(productId: number) {
    return quantityForProduct(basket, productId);
  }

  async function handleAdd(product: Product) {
    await addItem(product);
  }

  async function handleDecrement(productId: number) {
    await removeItem(productId);
  }

  const visibleProducts = products.filter(
    product => product.category?.id === selectedCategoryId,
  );

  const basketItemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const showSummaryBar = basketItemCount > 0;

  function goToBasket() {
    (
      navigation as unknown as NativeStackNavigationProp<RootStackParamList>
    ).navigate('Basket');
  }

  return (
    <View style={styles.flex}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeMain')}
      >
        <GridIcon size={18} />
        <Text style={styles.backButtonText}>Əsas kateqoriyalara qayıt</Text>
      </TouchableOpacity>

      <ScrollView
        ref={chipsScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        style={styles.chipsRow}
        contentContainerStyle={styles.chipsContent}
        onContentSizeChange={onChipsContentSizeChange}
      >
        {categories.map(category => {
          const active = category.id === selectedCategoryId;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.chip, active && styles.chipActive]}
              onLayout={event =>
                onChipLayout(category.id, {
                  x: event.nativeEvent.layout.x,
                  width: event.nativeEvent.layout.width,
                })
              }
              onPress={() => {
                setSelectedCategoryId(category.id);
                listRef.current?.scrollToTop({ animated: false });
                scrollToChip(category.id, true);
              }}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : loading && categories.length === 0 && products.length === 0 ? (
        <ProductGridSkeleton />
      ) : (
        <FlashList<Product>
          ref={listRef}
          data={visibleProducts}
          extraData={basket}
          keyExtractor={item => String(item.id)}
          numColumns={COLUMNS}
          showsVerticalScrollIndicator={false}
          onLoad={() => listRef.current?.scrollToTop({ animated: false })}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={EmptyCategoryState}
          style={[
            styles.list,
            showSummaryBar && {
              marginBottom:
                SUMMARY_BAR_HEIGHT + SUMMARY_BAR_GAP + SUMMARY_BAR_TOP_GAP,
            },
          ]}
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
                onAdd={() => handleAdd(item)}
                onIncrement={() => handleAdd(item)}
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
        onAdd={() => selectedProduct && handleAdd(selectedProduct)}
      />

      {showSummaryBar && (
        <BasketSummaryBar
          itemCount={basketItemCount}
          total={basket?.total}
          onPress={goToBasket}
        />
      )}
    </View>
  );
}

export default CategoryProductsScreen;
