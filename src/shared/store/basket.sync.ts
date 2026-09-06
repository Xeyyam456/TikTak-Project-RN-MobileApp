import { addToBasket, removeFromBasket } from '@shared/services/basket.service';
import { getApiErrorMessage } from '@shared/utils/apiError';
import { showErrorToast } from '@shared/utils/toast';
import type { Basket, Product } from '@typings/api';
import { findItem, sortBasketItems } from './basket.helpers';
import { showBasketSyncToast } from './basket.toasts';

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

// Only the basket slice is ever written from here, so this takes the
// narrowest setter it needs rather than the whole store's setState type —
// which also keeps this module from importing back from basket.store.
type SetBasket = (partial: { basket: Basket | undefined }) => void;

const pendingChanges = new Map<number, PendingBasketChange>();

// Records the intended net change for a product and (re)starts its debounce
// timer. Called on every +/- tap; the actual network sync only happens once
// tapping pauses, in flushBasketChange below.
export function scheduleBasketSync(
  productId: number,
  delta: 1 | -1,
  currentBasket: Basket | undefined,
  productForToast: Product | undefined,
  set: SetBasket,
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
  set: SetBasket,
) {
  const pending = pendingChanges.get(productId);
  if (!pending) return;
  pendingChanges.delete(productId);

  const { netDelta, baselineBasket } = pending;
  if (netDelta === 0) return;

  const wasPresentBefore = !!findItem(baselineBasket, productId);
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
    showBasketSyncToast(sorted, productId, productForToast, direction, wasPresentBefore);
  } catch (err) {
    set({ basket: baselineBasket });
    showErrorToast(getApiErrorMessage(err));
  }
}
