import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { listProducts } from '@shared/services/product.service';
import { queryKeys } from '@shared/queries/queryKeys';

const SEARCH_DEBOUNCE_MS = 500;

/**
 * Debounced product search. `onLeaveScreen` is called with the last typed
 * term when the screen loses focus, so the caller can record it in history.
 */
export default function useSearchQuery(onLeaveScreen: (term: string) => void) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Lets the useFocusEffect cleanup below read the latest typed value —
  // that callback is only set up once (empty dep array), so closing over
  // `query` directly there would always see the value from mount.
  const queryRef = useRef('');
  queryRef.current = query;
  const onLeaveRef = useRef(onLeaveScreen);
  onLeaveRef.current = onLeaveScreen;

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data: results = [], isFetching } = useQuery({
    queryKey: queryKeys.products({ search: debouncedQuery }),
    queryFn: () => {
      const lowerTrimmed = debouncedQuery.toLowerCase();
      return listProducts({ search: debouncedQuery }).then(response =>
        // The backend's `search` param apparently matches on more than just
        // title (e.g. searching "alma" returned "Ciyelek"), so narrow to
        // title-only matches client-side.
        response.data.filter(product =>
          product.title.toLowerCase().includes(lowerTrimmed),
        ),
      );
    },
    enabled: !!debouncedQuery,
  });

  // Query-key-based caching means a slow response for an earlier query can
  // never overwrite the current one (each debounced term gets its own cache
  // entry), so unlike the old manual-fetch version this no longer needs a
  // "drop stale response" ref guard. Still show the loading state while the
  // debounce timer itself is pending, not just while the request is in flight.
  const isDebouncing = query.trim() !== debouncedQuery;
  const loading = !!query.trim() && (isDebouncing || isFetching);

  // Tab screens stay mounted when you switch tabs, so without this the old
  // query/results would still be sitting there next time you come back to
  // the Search tab.
  useFocusEffect(
    useCallback(() => {
      return () => {
        onLeaveRef.current(queryRef.current);
        setQuery('');
        setDebouncedQuery('');
      };
    }, []),
  );

  /** Jumps straight to a term (from history), skipping the debounce. */
  function searchNow(term: string) {
    setQuery(term);
    setDebouncedQuery(term);
  }

  return { query, setQuery, results, loading, searchNow };
}
