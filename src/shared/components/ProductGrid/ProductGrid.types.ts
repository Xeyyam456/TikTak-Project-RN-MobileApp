import type { ReactElement, RefObject } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { FlashListRef } from '@shopify/flash-list';
import type { Basket, Product } from '@typings/api';

export type ProductGridProps = {
  products: Product[];
  // Passed straight to FlashList's extraData: it's a recycling list, so
  // basket-derived quantities inside a cell won't re-render on a store
  // change unless the basket is declared here too.
  basket: Basket | undefined;
  quantityFor: (productId: number) => number;
  onProductPress: (product: Product) => void;
  onAdd: (product: Product) => void;
  onDecrement: (productId: number) => void;
  refreshing: boolean;
  onRefresh: () => void;
  emptyComponent: ReactElement | (() => ReactElement);
  bottomInset: number;
  // Reserves room for the floating BasketSummaryBar when it's showing.
  reserveSummaryBar: boolean;
  listRef?: RefObject<FlashListRef<Product> | null>;
  onLoad?: () => void;
  style?: StyleProp<ViewStyle>;
};
