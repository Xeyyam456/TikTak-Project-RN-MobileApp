import i18n from '@shared/i18n/i18n';
import { showSuccessToast } from '@shared/utils/toast';
import type { Basket, Product } from '@typings/api';
import { findItem } from './basket.helpers';

/**
 * One toast per settled burst, phrased from what actually changed: added vs
 * quantity-increased on the way up, removed vs quantity-decreased on the way
 * down. `productForToast` is the fallback title for an item that is no longer
 * in the basket by the time the sync lands.
 */
export function showBasketSyncToast(
  basket: Basket,
  productId: number,
  productForToast: Product | undefined,
  direction: 1 | -1,
  wasPresentBefore: boolean,
) {
  const item = findItem(basket, productId);
  const title = item?.product.title ?? productForToast?.title ?? i18n.t('common.product');

  showSuccessToast(
    direction > 0
      ? i18n.t(wasPresentBefore ? 'basket.quantityIncreased' : 'basket.addedToBasket', {
          title,
        })
      : i18n.t(item ? 'basket.quantityDecreased' : 'basket.removedFromBasket', {
          title,
        }),
  );
}
