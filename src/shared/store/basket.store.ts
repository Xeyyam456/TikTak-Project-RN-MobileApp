import { create } from 'zustand';
import {
  addToBasket,
  clearBasket as clearBasketRequest,
  getBasket,
  removeFromBasket,
} from '@shared/services/basket.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast, showSuccessToast } from '@shared/utils/toast';
import type { Basket } from '@typings/api';

type BasketState = {
  basket: Basket | undefined;
  loading: boolean;
  error: string | undefined;
  fetchBasket: () => Promise<void>;
  addItem: (productId: number) => Promise<void>;
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
  addItem: async productId => {
    const previousBasket = get().basket;
    const existingItem = previousBasket?.items?.find(
      item => item.product.id === productId,
    );

    // Only bump an already-present item optimistically — a brand new item
    // needs the product's title/price/image to render a basket row, which
    // this store only has for products already in the basket. The first
    // add of a product still waits on the real response, same as before.
    if (previousBasket && existingItem) {
      set({ basket: adjustItemQuantity(previousBasket, productId, 1) });
    }

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
      if (previousBasket) set({ basket: previousBasket });
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

export function quantityForProduct(basket: Basket | undefined, productId: number) {
  return (
    basket?.items?.find(item => item.product.id === productId)?.quantity ?? 0
  );
}
