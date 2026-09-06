import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { Product } from '@typings/api';
import {
  SUMMARY_BAR_GAP,
  SUMMARY_BAR_HEIGHT,
  SUMMARY_BAR_TOP_GAP,
} from '../BasketSummaryBar';
import ProductCard, { COLUMNS } from '../ProductCard';
import { styles } from './ProductGrid.styles';
import type { ProductGridProps } from './ProductGrid.types';

// Shared by CategoryProductsScreen and MyListsScreen — both render the
// same basket-aware product grid, only the data source, empty state and
// outer shape differ.
function ProductGrid({
  products,
  basket,
  quantityFor,
  onProductPress,
  onAdd,
  onDecrement,
  refreshing,
  onRefresh,
  emptyComponent,
  bottomInset,
  reserveSummaryBar,
  listRef,
  onLoad,
  style,
}: ProductGridProps) {
  return (
    <FlashList<Product>
      ref={listRef}
      data={products}
      extraData={basket}
      keyExtractor={item => String(item.id)}
      numColumns={COLUMNS}
      showsVerticalScrollIndicator={false}
      onLoad={onLoad}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={emptyComponent}
      style={[
        style,
        reserveSummaryBar && {
          marginBottom:
            SUMMARY_BAR_HEIGHT + SUMMARY_BAR_GAP + SUMMARY_BAR_TOP_GAP,
        },
      ]}
      contentContainerStyle={[
        styles.listContent,
        { paddingBottom: bottomInset + 24 },
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
            onPress={() => onProductPress(item)}
            onAdd={() => onAdd(item)}
            onIncrement={() => onAdd(item)}
            onDecrement={() => onDecrement(item.id)}
          />
        </View>
      )}
    />
  );
}

export default ProductGrid;
