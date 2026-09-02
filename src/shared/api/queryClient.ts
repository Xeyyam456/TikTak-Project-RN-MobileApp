import { QueryClient } from '@tanstack/react-query';

// Exported as its own module (not defined inline in App.tsx) so
// httpClient.ts can also reach it — a genuine session expiry there clears
// this the same way ProfileScreen's explicit logout does, so a different
// user logging in afterward doesn't see the previous user's cached data.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // Must stay >= persistOptions.maxAge in App.tsx — gcTime is when an
      // unused query is dropped from the in-memory cache, and a query
      // dropped there is also dropped from what gets written to MMKV on
      // the next persist, so a short gcTime would silently defeat the
      // persistence.
      gcTime: 24 * 60 * 60 * 1000,
      retry: 1,
    },
  },
});
