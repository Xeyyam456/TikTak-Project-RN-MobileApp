import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import ProductCard, { COLUMNS } from '@shared/components/ProductCard';
import { GridIcon } from '@shared/components/icons';
import { listCategories } from '@shared/services/category.service';
import { listProducts } from '@shared/services/product.service';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import type { Category, Product } from '@typings/api';
import type { HomeStackParamList, RootStackParamList } from '@typings/navigation';
import EmptyCategoryState from '../EmptyCategoryState';
import ProductDetailSheet from '../ProductDetailSheet';
import { styles } from './CategoryProductsScreen.styles';

function CategoryProductsScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route =
    useRoute<RouteProp<HomeStackParamList, 'CategoryProducts'>>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    route.params.categoryId,
  );
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const listRef = useRef<FlashListRef<Product>>(null);
  const chipsScrollRef = useRef<ScrollView>(null);
  const chipLayouts = useRef<Record<number, { x: number; width: number }>>({});
  const hasScrolledToInitialChip = useRef(false);
  const chipsContentReady = useRef(false);

  const basket = useBasketStore(state => state.basket);
  const fetchBasket = useBasketStore(state => state.fetchBasket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  useEffect(() => {
    Promise.all([listCategories(), listProducts({ limit: 200 }), fetchBasket()])
      .then(([categoryList, productList]) => {
        setCategories(categoryList);
        setProducts(productList.data);
      })
      .finally(() => setLoading(false));
  }, [fetchBasket]);

  function scrollToChip(categoryId: number, animated: boolean) {
    const layout = chipLayouts.current[categoryId];
    if (!layout) return;
    // A scrollTo issued in the same commit as the chips' own layout can be
    // silently dropped — the native ScrollView hasn't settled its content
    // size yet and resets the offset once it does. Defer one frame so the
    // native layout is stable before applying the offset.
    requestAnimationFrame(() => {
      chipsScrollRef.current?.scrollTo({
        x: Math.max(0, layout.x - 20),
        animated,
      });
    });
  }

  // The ScrollView won't scroll past its currently-known content width, so
  // scrolling to a chip near the end before every chip has been measured
  // (onContentSizeChange not fired yet) silently clamps to a no-op. Wait for
  // both signals — full content width settled AND this chip's own position
  // known — before attempting the one-time initial scroll.
  function maybeScrollToInitialChip() {
    if (hasScrolledToInitialChip.current) return;
    if (!chipsContentReady.current) return;
    if (!chipLayouts.current[selectedCategoryId]) return;
    hasScrolledToInitialChip.current = true;
    scrollToChip(selectedCategoryId, false);
  }

  function quantityFor(productId: number) {
    return quantityForProduct(basket, productId);
  }

  async function handleAdd(productId: number) {
    await addItem(productId);
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
        onContentSizeChange={() => {
          chipsContentReady.current = true;
          maybeScrollToInitialChip();
        }}
      >
        {categories.map(category => {
          const active = category.id === selectedCategoryId;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.chip, active && styles.chipActive]}
              onLayout={event => {
                chipLayouts.current[category.id] = {
                  x: event.nativeEvent.layout.x,
                  width: event.nativeEvent.layout.width,
                };
                maybeScrollToInitialChip();
              }}
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

      {loading ? (
        <ActivityIndicator color="#7BC043" style={styles.loader} />
      ) : (
        <FlashList<Product>
          ref={listRef}
          data={visibleProducts}
          extraData={basket}
          keyExtractor={item => String(item.id)}
          numColumns={COLUMNS}
          showsVerticalScrollIndicator={false}
          onLoad={() => listRef.current?.scrollToTop({ animated: false })}
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
