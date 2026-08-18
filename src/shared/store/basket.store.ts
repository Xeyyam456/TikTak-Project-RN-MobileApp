import { create } from 'zustand';
import {
  addToBasket,
  getBasket,
  removeFromBasket,
} from '@shared/services/basket.service';
import type { Basket } from '@typings/api';

type BasketState = {
  basket: Basket | undefined;
  loading: boolean;
  fetchBasket: () => Promise<void>;
  addItem: (productId: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
};

export const useBasketStore = create<BasketState>((set) => ({
  basket: undefined,
  loading: false,
  fetchBasket: async () => {
    set({ loading: true });
    try {
      const basket = await getBasket();
      set({ basket });
    } finally {
      set({ loading: false });
    }
  },
  addItem: async productId => {
    const basket = await addToBasket(productId);
    set({ basket });
  },
  removeItem: async productId => {
    const basket = await removeFromBasket(productId);
    set({ basket });
  },
}));

export function quantityForProduct(basket: Basket | undefined, productId: number) {
  return (
    basket?.items?.find(item => item.product.id === productId)?.quantity ?? 0
  );
}
