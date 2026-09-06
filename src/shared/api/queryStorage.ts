import { createMMKV } from 'react-native-mmkv';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

// Separate from tokenStorage.ts's encrypted instance on purpose: this only
// ever holds cached API responses (products, categories, basket, orders),
// never tokens, so it doesn't need the Keychain-backed encryption key and
// can be created synchronously at import time instead of waiting on
// initTokenStorage()'s async Keystore read.
const cache = createMMKV({ id: 'tiktak-query-cache' });

// createSyncStoragePersister is deprecated in favor of this — MMKV's calls
// are synchronous, which AsyncStorage's Promisable return type still allows.
export const queryPersister = createAsyncStoragePersister({
  storage: {
    getItem: key => cache.getString(key) ?? null,
    setItem: (key, value) => cache.set(key, value),
    removeItem: key => {
      cache.remove(key);
    },
  },
});

// Bump this if a cached query's shape ever changes in a way old persisted
// data wouldn't satisfy (e.g. a field rename) — a mismatched buster makes
// restoreClient() discard the old cache instead of rehydrating it.
const CACHE_BUSTER = 'v1';

// Kept next to the persister it configures: maxAge must stay in step with
// queryClient's gcTime (both 24h), otherwise an unused query drops from
// memory before it would be written to disk and persistence silently does
// nothing.
export const persistOptions = {
  persister: queryPersister,
  maxAge: 24 * 60 * 60 * 1000,
  buster: CACHE_BUSTER,
};
