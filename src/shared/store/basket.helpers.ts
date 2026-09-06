import type { Basket, BasketItem, Product } from '@typings/api';

// Backend doesn't guarantee stable item order across mutations (e.g. bumps the
// just-changed item to the front) — sort by item id so basket rows don't swap
// places when a quantity changes.
export function sortBasketItems(basket: Basket): Basket {
  if (!basket.items) {
    return basket;
  }
  return { ...basket, items: [...basket.items].sort((a, b) => a.id - b.id) };
}

// Applied immediately (before the request resolves) so +/- taps feel instant;
// the real response from addToBasket/removeFromBasket overwrites this guess
// right after, and a failed request reverts to the pre-tap basket entirely
// rather than trying to un-apply just this delta.
export function adjustItemQuantity(
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

  return withTotals(basket, items);
}

// Synthesizes a basket row for a product that isn't in the basket yet, so
// the optimistic update in addItem() has something to show immediately.
// `id` is a placeholder (real basket items get theirs from the backend) —
// using a negative number keeps it from ever colliding with a real id, and
// it's overwritten by the real response moments later regardless.
export function addNewItem(basket: Basket | undefined, product: Product): Basket {
  const price = Number(product.price);
  const newItem: BasketItem = {
    id: -product.id,
    quantity: 1,
    total_price: Number.isFinite(price) ? price.toFixed(2) : '0.00',
    product,
  };
  return withTotals(basket, [...(basket?.items ?? []), newItem]);
}

function withTotals(basket: Basket | undefined, items: BasketItem[]): Basket {
  const total = items.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...basket, items, total: total.toFixed(2), count };
}

export function findItem(basket: Basket | undefined, productId: number) {
  return basket?.items?.find(item => item.product.id === productId);
}

export function quantityForProduct(basket: Basket | undefined, productId: number) {
  return findItem(basket, productId)?.quantity ?? 0;
}
