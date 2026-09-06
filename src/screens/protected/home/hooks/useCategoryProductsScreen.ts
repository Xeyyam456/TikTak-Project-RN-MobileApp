import { useRef, useState } from 'react';
import type { FlashListRef } from '@shopify/flash-list';
import useReload from '@shared/hooks/useReload';
import type { Product } from '@typings/api';
import { useCategoryChipsScroll } from './useCategoryChipsScroll';
import { useCategoryProductsData } from './useCategoryProductsData';

// Composes the screen's own state (selected category, list ref) with the
// data and chips-scroll hooks, so CategoryProductsScreen is left with just
// its layout.
export function useCategoryProductsScreen(initialCategoryId: number) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
  const listRef = useRef<FlashListRef<Product>>(null);
  const chips = useCategoryChipsScroll(selectedCategoryId);
  const { categories, products, loading, error, retry } = useCategoryProductsData();
  const { refreshing, onRefresh } = useReload(retry);

  const visibleProducts = products.filter(
    product => product.category?.id === selectedCategoryId,
  );

  function selectCategory(categoryId: number) {
    setSelectedCategoryId(categoryId);
    listRef.current?.scrollToTop({ animated: false });
    chips.scrollToChip(categoryId, true);
  }

  return {
    selectedCategoryId,
    selectCategory,
    listRef,
    chips,
    categories,
    visibleProducts,
    isEmptyFirstLoad: loading && categories.length === 0 && products.length === 0,
    error,
    retry,
    refreshing,
    onRefresh,
  };
}
