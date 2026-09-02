import { create } from 'zustand';
import {
  addToBasket,
  clearBasket as clearBasketRequest,
  getBasket,
  removeFromBasket,
} from '@shared/services/basket.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast, showSuccessToast } from '@shared/utils/toast';
import type { Basket, BasketItem, Product } from '@typings/api';

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
    const previousBasket = get().basket;
    const existingItem = previousBasket?.items?.find(
      item => item.product.id === productId,
    );

    // An already-present item just bumps its quantity. A brand new one used
    // to skip the optimistic update entirely (this store only had product
    // data for items already in the basket) — the "+" button would sit
    // there doing nothing until the request resolved, which read as lag.
    // ProductCard/ProductDetailSheet already have the full product at the
    // call site now, so a new item can build its own basket row too.
    set({
      basket:
        previousBasket && existingItem
          ? adjustItemQuantity(previousBasket, productId, 1)
          : addNewItem(previousBasket, product),
    });

    try {
      const basket = await addToBasket(productId);
      set({ basket: sortBasketItems(basket) });
      const title =
        basket.items?.find(item => item.product.id === productId)?.product
          .title ?? 'Məhsul';
      showSuccessToast(
        `${title} ${existingItem ? 'sayı artırıldı' : 'səbətə əlavə edildi'}`,
      );
    } catch (err) {
      set({ basket: previousBasket });
      showErrorToast(getApiErrorMessage(err));
    }
  },
  removeItem: async productId => {
    const previousBasket = get().basket;
    const previousItem = previousBasket?.items?.find(
      item => item.product.id === productId,
    );

    if (previousBasket && previousItem) {
      set({ basket: adjustItemQuantity(previousBasket, productId, -1) });
    }

    try {
      const basket = await removeFromBasket(productId);
      set({ basket: sortBasketItems(basket) });
      const title = previousItem?.product.title ?? 'Məhsul';
      showSuccessToast(
        `${title} ${(previousItem?.quantity ?? 0) <= 1 ? 'səbətdən silindi' : 'sayı azaldıldı'}`,
      );
    } catch (err) {
      if (previousBasket) set({ basket: previousBasket });
      showErrorToast(getApiErrorMessage(err));
    }
  },
  clearBasket: async () => {
    const previousBasket = get().basket;
    set({ basket: previousBasket && { ...previousBasket, items: [], total: '0.00', count: 0 } });
    try {
      const basket = await clearBasketRequest();
      set({ basket: sortBasketItems(basket) });
      showSuccessToast('Səbət təmizləndi');
    } catch (err) {
      if (previousBasket) set({ basket: previousBasket });
      showErrorToast(getApiErrorMessage(err));
    }
  },
}));

// Backend doesn't guarantee stable item order across mutations (e.g. bumps the
// just-changed item to the front) — sort by item id so basket rows don't swap
// places when a quantity changes.
function sortBasketItems(basket: Basket): Basket {
  if (!basket.items) {
    return basket;
  }
  return { ...basket, items: [...basket.items].sort((a, b) => a.id - b.id) };
}

// Applied immediately (before the request resolves) so +/- taps feel instant;
// the real response from addToBasket/removeFromBasket overwrites this guess
// right after, and a failed request reverts to the pre-tap basket entirely
// rather than trying to un-apply just this delta.
function adjustItemQuantity(
  basket: Basket,
  productId: number,
  delta: 1 | -1,
): Basket {
  const items = (basket.items ?? [])
    .map(item => {
      if (item.product.id !== productId) return item;
      const quantity = item.quantity + delta;
      const price = Number(item.product.price);
      return {
        ...item,
        quantity,
        total_price: Number.isFinite(price) ? (price * quantity).toFixed(2) : item.total_price,
      };
    })
    .filter(item => item.quantity > 0);

  const total = items.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { ...basket, items, total: total.toFixed(2), count };
}

// Synthesizes a basket row for a product that isn't in the basket yet, so
// the optimistic update in addItem() above has something to show
// immediately. `id` is a placeholder (real basket items get theirs from
// the backend) — using a negative number keeps it from ever colliding with
// a real id, and it's overwritten by the real response moments later
// regardless.
function addNewItem(basket: Basket | undefined, product: Product): Basket {
  const price = Number(product.price);
  const newItem: BasketItem = {
    id: -product.id,
    quantity: 1,
    total_price: Number.isFinite(price) ? price.toFixed(2) : '0.00',
    product,
  };
  const items = [...(basket?.items ?? []), newItem];
  const total = items.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, total: total.toFixed(2), count };
}

export function quantityForProduct(basket: Basket | undefined, productId: number) {
  return (
    basket?.items?.find(item => item.product.id === productId)?.quantity ?? 0
  );
}
