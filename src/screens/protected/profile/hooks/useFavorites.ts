import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useReload from '@shared/hooks/useReload';
import { listFavorites } from '@shared/services/product.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Product } from '@typings/api';

export function useFavorites(selectedProduct: Product | null) {
  const queryClient = useQueryClient();
  const fetchBasket = useBasketStore(state => state.fetchBasket);

  const {
    data: favorites = [],
    isPending: loading,
    error: queryError,
    refetch,
  } = useQuery({ queryKey: queryKeys.favorites, queryFn: listFavorites });

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const { refreshing, onRefresh } = useReload(() =>
    Promise.all([refetch(), fetchBasket()]),
  );

  function setFavorites(update: (current: Product[]) => Product[]) {
    queryClient.setQueryData(queryKeys.favorites, update);
  }

  // Keeps the list in sync with the heart toggle inside ProductDetailSheet
  // without a full refetch.
  function onFavoriteChange(productId: number, isFavorite: boolean) {
    if (!isFavorite) {
      setFavorites(current => current.filter(p => p.id !== productId));
      return;
    }
    // Re-favorited within the same sheet session — put it back.
    setFavorites(current => {
      if (current.some(p => p.id === productId)) return current;
      if (!selectedProduct || selectedProduct.id !== productId) return current;
      return [selectedProduct, ...current];
    });
  }

  return {
    favorites,
    isEmptyFirstLoad: loading && favorites.length === 0,
    error: queryError ? getApiErrorMessage(queryError) : undefined,
    refetch,
    refreshing,
    onRefresh,
    onFavoriteChange,
  };
}
