import { create } from 'zustand';
import i18n from '@shared/i18n';
import {
  clearBasket as clearBasketRequest,
  getBasket,
} from '@shared/services/basket.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast, showSuccessToast } from '@shared/utils/toast';
import type { Basket, Product } from '@typings/api';
import {
  addNewItem,
  adjustItemQuantity,
  findItem,
  sortBasketItems,
} from './basket.helpers';
import { scheduleBasketSync } from './basket.sync';

// Re-exported here because every screen imports it from the store — the
// implementation lives in basket.helpers.ts with the rest of the pure
// basket maths.
export { quantityForProduct } from './basket.helpers';

type BasketState = {
  basket: Basket | undefined;
  loading: boolean;
  error: string | undefined;
  fetchBasket: () => Promise<void>;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearBasket: () => Promise<void>;
};

export const useBasketStore = create<BasketState>((set, get) => ({
  basket: undefined,
  loading: false,
  error: undefined,
  fetchBasket: async () => {
    set({ loading: true, error: undefined });
    try {
      const basket = await getBasket();
      set({ basket: sortBasketItems(basket) });
    } catch (err) {
      set({ error: getApiErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },
  addItem: async product => {
    const productId = product.id;
    const currentBasket = get().basket;
    const existingItem = findItem(currentBasket, productId);

    // An already-present item just bumps its quantity. A brand new one used
    // to skip the optimistic update entirely (this store only had product
    // data for items already in the basket) — the "+" button would sit
    // there doing nothing until the request resolved, which read as lag.
    // ProductCard/ProductDetailSheet already have the full product at the
    // call site now, so a new item can build its own basket row too.
    set({
      basket:
        currentBasket && existingItem
          ? adjustItemQuantity(currentBasket, productId, 1)
          : addNewItem(currentBasket, product),
    });

    scheduleBasketSync(productId, 1, currentBasket, product, set);
  },
  removeItem: async productId => {
    const currentBasket = get().basket;
    const existingItem = findItem(currentBasket, productId);

    if (currentBasket && existingItem) {
      set({ basket: adjustItemQuantity(currentBasket, productId, -1) });
    }

    scheduleBasketSync(productId, -1, currentBasket, existingItem?.product, set);
  },
  clearBasket: async () => {
    const previousBasket = get().basket;
    set({ basket: previousBasket && { ...previousBasket, items: [], total: '0.00', count: 0 } });
    try {
      const basket = await clearBasketRequest();
      set({ basket: sortBasketItems(basket) });
      showSuccessToast(i18n.t('basket.cleared'));
    } catch (err) {
      if (previousBasket) set({ basket: previousBasket });
      showErrorToast(getApiErrorMessage(err));
    }
  },
}));
