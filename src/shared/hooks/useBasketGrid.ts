import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';

// The basket wiring every product-grid screen needs: the store actions the
// cards call, the per-product quantity lookup, and whether the floating
// summary bar should be showing. Shared by CategoryProductsScreen and
// MyListsScreen, which had identical copies of all of it.
export function useBasketGrid() {
  const basket = useBasketStore(state => state.basket);
  const addItem = useBasketStore(state => state.addItem);
  const removeItem = useBasketStore(state => state.removeItem);

  const basketItemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return {
    basket,
    addItem,
    removeItem,
    basketItemCount,
    showSummaryBar: basketItemCount > 0,
    quantityFor: (productId: number) => quantityForProduct(basket, productId),
  };
}
