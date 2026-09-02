import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { listCategories } from '@shared/services/category.service';
import { listProducts } from '@shared/services/product.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';

const PRODUCTS_PARAMS = { limit: 200 };

export function useCategoryProductsData() {
  const fetchBasket = useBasketStore(state => state.fetchBasket);

  const [categoriesQuery, productsQuery] = useQueries({
    queries: [
      { queryKey: queryKeys.categories, queryFn: listCategories },
      {
        queryKey: queryKeys.products(PRODUCTS_PARAMS),
        queryFn: () => listProducts(PRODUCTS_PARAMS).then(res => res.data),
      },
    ],
  });

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const categories = categoriesQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const loading = categoriesQuery.isPending || productsQuery.isPending;
  const firstError = categoriesQuery.error ?? productsQuery.error;
  const error = firstError ? getApiErrorMessage(firstError) : undefined;

  function retry() {
    return Promise.all([
      categoriesQuery.refetch(),
      productsQuery.refetch(),
      fetchBasket(),
    ]);
  }

  return { categories, products, loading, error, retry };
}
