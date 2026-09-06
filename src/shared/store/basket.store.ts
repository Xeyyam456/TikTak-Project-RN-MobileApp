import { create, type StoreApi } from 'zustand';
import i18n from '@shared/i18n/i18n';
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

// Rapid +/- taps used to fire one addToBasket/removeFromBasket request per
// tap immediately — besides hammering the API, those requests can resolve
// out of order and each one's response would clobber the basket state,
// occasionally leaving the displayed quantity wrong after a burst of taps,
// on top of showing one toast per tap. The backend only offers ±1-per-call
// endpoints (no "set quantity to N"), so a burst still needs one call per
// unit — debouncing here means: keep the optimistic UI update instant on
// every tap, but wait for a pause in tapping before actually syncing with
// the server, sending exactly the net number of calls needed and settling
// on a single toast/state update at the end. `baselineBasket` is the
// basket as it was before the *first* tap in the current burst, so a
// failed sync reverts the whole burst at once rather than partially.
const DEBOUNCE_MS = 300;
type PendingBasketChange = {
  timer: ReturnType<typeof setTimeout>;
  netDelta: number;
  baselineBasket: Basket | undefined;
};
const pendingChanges = new Map<number, PendingBasketChange>();

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
    const existingItem = currentBasket?.items?.find(
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
        currentBasket && existingItem
          ? adjustItemQuantity(currentBasket, productId, 1)
          : addNewItem(currentBasket, product),
    });

    scheduleBasketSync(productId, 1, currentBasket, product, set);
  },
  removeItem: async productId => {
    const currentBasket = get().basket;
    const existingItem = currentBasket?.items?.find(
      item => item.product.id === productId,
    );

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

// Records the intended net change for a product and (re)starts its debounce
// timer. Called on every +/- tap; the actual network sync only happens once
// tapping pauses, in flushBasketChange below.
function scheduleBasketSync(
  productId: number,
  delta: 1 | -1,
  currentBasket: Basket | undefined,
  productForToast: Product | undefined,
  set: StoreApi<BasketState>['setState'],
) {
  const pending = pendingChanges.get(productId);
  if (pending) clearTimeout(pending.timer);

  const baselineBasket = pending ? pending.baselineBasket : currentBasket;
  const netDelta = (pending?.netDelta ?? 0) + delta;
  const timer = setTimeout(() => {
    void flushBasketChange(productId, productForToast, set);
  }, DEBOUNCE_MS);

  pendingChanges.set(productId, { timer, netDelta, baselineBasket });
}

// Runs once a burst of +/- taps settles: replays the net delta as that many
// single ±1 API calls (the backend has no "set quantity to N" endpoint),
// then applies the real response and shows exactly one toast. A failure
// reverts all the way back to `baselineBasket` — the state from before the
// first tap in the burst — rather than trying to partially unwind it.
async function flushBasketChange(
  productId: number,
  productForToast: Product | undefined,
  set: StoreApi<BasketState>['setState'],
) {
  const pending = pendingChanges.get(productId);
  if (!pending) return;
  pendingChanges.delete(productId);

  const { netDelta, baselineBasket } = pending;
  if (netDelta === 0) return;

  const wasPresentBefore = !!baselineBasket?.items?.find(
    item => item.product.id === productId,
  );
  const direction: 1 | -1 = netDelta > 0 ? 1 : -1;
  const steps = Math.abs(netDelta);

  try {
    let basket: Basket | undefined;
    for (let i = 0; i < steps; i++) {
      basket =
        direction > 0
          ? await addToBasket(productId)
          : await removeFromBasket(productId);
    }
    if (!basket) return;

    const sorted = sortBasketItems(basket);
    set({ basket: sorted });

    const stillPresent = !!sorted.items?.find(
      item => item.product.id === productId,
    );
    const title =
      sorted.items?.find(item => item.product.id === productId)?.product
        .title ??
      productForToast?.title ??
      i18n.t('common.product');

    showSuccessToast(
      direction > 0
        ? i18n.t(
            wasPresentBefore ? 'basket.quantityIncreased' : 'basket.addedToBasket',
            { title },
          )
        : i18n.t(
            stillPresent ? 'basket.quantityDecreased' : 'basket.removedFromBasket',
            { title },
          ),
    );
  } catch (err) {
    set({ basket: baselineBasket });
    showErrorToast(getApiErrorMessage(err));
  }
}

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
