import { create } from 'zustand';
import {
  addToBasket,
  clearBasket as clearBasketRequest,
  getBasket,
  removeFromBasket,
} from '@shared/services/basket.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showSuccessToast } from '@shared/utils/toast';
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
      set({ basket });
    } catch (err) {
      set({ error: getApiErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },
  addItem: async productId => {
    const previousQuantity = quantityForProduct(get().basket, productId);
    const basket = await addToBasket(productId);
    set({ basket });
    const title =
      basket.items?.find(item => item.product.id === productId)?.product
        .title ?? 'Məhsul';
    showSuccessToast(
      `${title} ${previousQuantity === 0 ? 'səbətə əlavə edildi' : 'sayı artırıldı'}`,
    );
  },
  removeItem: async productId => {
    const previousItem = get().basket?.items?.find(
      item => item.product.id === productId,
    );
    const basket = await removeFromBasket(productId);
    set({ basket });
    const title = previousItem?.product.title ?? 'Məhsul';
    showSuccessToast(
      `${title} ${(previousItem?.quantity ?? 0) <= 1 ? 'səbətdən silindi' : 'sayı azaldıldı'}`,
    );
  },
  clearBasket: async () => {
    const basket = await clearBasketRequest();
    set({ basket });
    showSuccessToast('Səbət təmizləndi');
  },
}));

export function quantityForProduct(basket: Basket | undefined, productId: number) {
  return (
    basket?.items?.find(item => item.product.id === productId)?.quantity ?? 0
  );
}
