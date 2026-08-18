import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
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
import Button from '@shared/components/Button';
import { GridIcon } from '@shared/components/icons';
import { listCategories } from '@shared/services/category.service';
import { listProducts } from '@shared/services/product.service';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import type { Category, Product } from '@typings/api';
import type { HomeStackParamList, RootStackParamList } from '@typings/navigation';
import { FONTS } from '../../../theme/fonts';
import EmptyCategoryState from './EmptyCategoryState';
import ProductDetailSheet from './ProductDetailSheet';

const COLUMNS = 2;
const GRID_GAP = 12;
const HORIZONTAL_PADDING = 15;
const CARD_WIDTH =
  (Dimensions.get('window').width -
    HORIZONTAL_PADDING * 2 -
    GRID_GAP * (COLUMNS - 1)) /
  COLUMNS;
const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function ProductCard({
  product,
  quantity,
  onPress,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  product: Product;
  quantity: number;
  onPress: () => void;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const total = (Number(product.price) * quantity).toFixed(2);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.cardImage}>
        <Image
          source={{ uri: product.img_url || FALLBACK_IMAGE_URL }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {product.title}
      </Text>

      {quantity > 0 ? (
        <>
          <Text style={styles.bulkPriceLine}>
            <Text style={styles.bulkPriceQty}>
              {quantity} {product.type}
            </Text>
            <Text style={styles.bulkPriceEquals}> = </Text>
            <Text style={styles.bulkPriceTotal}>{total} AZN</Text>
          </Text>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepperMinus} onPress={onDecrement}>
              <Text style={styles.stepperMinusText}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stepperPlus} onPress={onIncrement}>
              <Text style={styles.stepperPlusText}>
                + {quantity} {product.type}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.cardPrice}>{product.price} AZN</Text>
          <Button
            title="Səbətə əlavə et"
            onPress={onAdd}
            style={styles.addButton}
          />
        </>
      )}
    </TouchableOpacity>
  );
}

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
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        style={styles.chipsRow}
        contentContainerStyle={styles.chipsContent}
      >
        {categories.map(category => {
          const active = category.id === selectedCategoryId;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => {
                setSelectedCategoryId(category.id);
                listRef.current?.scrollToTop({ animated: false });
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
          style={styles.list}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 24 + (showSummaryBar ? 84 : 0) },
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
        <TouchableOpacity
          style={[styles.summaryBar, { marginBottom: insets.bottom + 12 }]}
          activeOpacity={0.85}
          onPress={goToBasket}
        >
          <View style={styles.summaryBarLeft}>
            <View style={styles.summaryCountBadge}>
              <Text style={styles.summaryCountText}>{basketItemCount}</Text>
            </View>
            <Text style={styles.summaryBarLabel}>Sifarişlər</Text>
          </View>
          <Text style={styles.summaryBarTotal}>₼ {basket?.total}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    marginHorizontal: HORIZONTAL_PADDING,
    backgroundColor: '#7BC043',
    borderRadius: 10,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
  },
  chipsRow: {
    marginTop: 14,
    marginHorizontal: HORIZONTAL_PADDING,
    borderRadius: 10,
    overflow: 'hidden',
    flexGrow: 0,
  },
  chipsContent: {
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 38,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#7BC043',
    borderColor: '#7BC043',
  },
  chipText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#555555',
    fontFamily: FONTS.medium,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  loader: {
    marginTop: 32,
  },
  list: {
    marginTop: 14,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  cardWrapper: {
    marginBottom: GRID_GAP,
  },
  cardWrapperRight: {
    marginLeft: GRID_GAP,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    padding: 6,
    gap: 3,
  },
  cardImage: {
    width: '92%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 13,
    lineHeight: 17,
    height: 34,
    color: '#1A1A1A',
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 14,
    lineHeight: 18,
    height: 18,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  addButton: {
    height: 34,
    paddingVertical: 0,
  },
  bulkPriceLine: {
    fontSize: 12,
    lineHeight: 18,
    height: 18,
    textAlign: 'center',
  },
  bulkPriceQty: {
    color: '#B85C5C',
    fontFamily: FONTS.medium,
  },
  bulkPriceEquals: {
    color: '#E24C4C',
    fontFamily: FONTS.semiBold,
  },
  bulkPriceTotal: {
    fontSize: 13,
    color: '#E24C4C',
    fontFamily: FONTS.extraBold,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepperMinus: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F6D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperMinusText: {
    fontSize: 18,
    color: '#E24C4C',
    fontFamily: FONTS.bold,
  },
  stepperPlus: {
    flex: 1,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#7BC043',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperPlusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
  },
  summaryBar: {
    position: 'absolute',
    left: HORIZONTAL_PADDING,
    right: HORIZONTAL_PADDING,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  summaryBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryCountBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCountText: {
    fontSize: 12,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  summaryBarLabel: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: FONTS.semiBold,
  },
  summaryBarTotal: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
});

export default CategoryProductsScreen;
