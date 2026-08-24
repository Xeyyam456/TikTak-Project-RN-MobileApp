import { useCallback, useEffect, useState } from 'react';
import { listCategories } from '@shared/services/category.service';
import { listProducts } from '@shared/services/product.service';
import { useBasketStore } from '@shared/store/basket.store';
import { getApiErrorMessage } from '@shared/utils/apiError';
import type { Category, Product } from '@typings/api';

export function useCategoryProductsData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchBasket = useBasketStore(state => state.fetchBasket);

  const load = useCallback(() => {
    setLoading(true);
    setError(undefined);
    return Promise.all([
      listCategories(),
      listProducts({ limit: 200 }),
      fetchBasket(),
    ])
      .then(([categoryList, productList]) => {
        setCategories(categoryList);
        setProducts(productList.data);
      })
      .catch(err => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [fetchBasket]);

  useEffect(() => {
    load();
  }, [load]);

  return { categories, products, loading, error, retry: load };
}
