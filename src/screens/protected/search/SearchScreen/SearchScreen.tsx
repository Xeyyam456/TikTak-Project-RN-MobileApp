import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import AppHeader from '@shared/components/AppHeader';
import Input from '@shared/components/Input';
import { ClockIcon, CloseIcon } from '@shared/components/icons';
import { listProducts } from '@shared/services/product.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import {
  addSearchHistory,
  clearSearchHistory,
  getSearchHistory,
  removeSearchHistoryEntry,
} from '@shared/utils/searchHistory';
import type { Product } from '@typings/api';
import ProductDetailSheet from '../../home/ProductDetailSheet';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SearchScreen.styles';

const SEARCH_DEBOUNCE_MS = 500;
const FALLBACK_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvSMU5gdda6lqS8a-kjktyTUE6rLzlVr6LA&s';

function ResultRow({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <Image
        source={{ uri: product.img_url || FALLBACK_IMAGE_URL }}
        style={styles.rowImage}
        resizeMode="cover"
      />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.rowPrice}>{product.price} AZN</Text>
      </View>
    </TouchableOpacity>
  );
}

function HistoryRow({
  term,
  onPress,
  onRemove,
}: {
  term: string;
  onPress: () => void;
  onRemove: () => void;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.historyRow} activeOpacity={0.7} onPress={onPress}>
      <ClockIcon size={18} color={colors.textMuted} />
      <Text style={styles.historyText} numberOfLines={1}>
        {term}
      </Text>
      <TouchableOpacity hitSlop={10} onPress={onRemove}>
        <CloseIcon size={14} color={colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function SearchScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());

  const basket = useBasketStore(state => state.basket);
  const addItem = useBasketStore(state => state.addItem);

  // Lets the useFocusEffect cleanup below read the latest typed value —
  // that callback is only set up once (empty dep array), so closing over
  // `query` directly there would always see the value from mount.
  const queryRef = useRef('');
  queryRef.current = query;

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [query]);

  const trimmed = debouncedQuery;
  const { data: results = [], isFetching } = useQuery({
    queryKey: queryKeys.products({ search: trimmed }),
    queryFn: () => {
      const lowerTrimmed = trimmed.toLowerCase();
      return listProducts({ search: trimmed }).then(response =>
        // The backend's `search` param apparently matches on more than just
        // title (e.g. searching "alma" returned "Ciyelek"), so narrow to
        // title-only matches client-side.
        response.data.filter(product =>
          product.title.toLowerCase().includes(lowerTrimmed),
        ),
      );
    },
    enabled: !!trimmed,
  });

  // Query-key-based caching means a slow response for an earlier query can
  // never overwrite the current one (each debounced term gets its own cache
  // entry), so unlike the old manual-fetch version this no longer needs a
  // "drop stale response" ref guard. Still show the loading state while the
  // debounce timer itself is pending, not just while the request is in flight.
  const isDebouncing = query.trim() !== debouncedQuery;
  const loading = !!query.trim() && (isDebouncing || isFetching);

  async function handleAdd(productId: number) {
    await addItem(productId);
  }

  function handleSelectHistory(term: string) {
    setQuery(term);
    setDebouncedQuery(term);
    setHistory(addSearchHistory(term));
  }

  // Recording on every debounce tick (or requiring an explicit submit
  // button) both save typing-in-progress fragments — pausing mid-word while
  // typing "alma" would save "al" as a separate entry from "alma". Instead
  // save once, only when the user is actually done with the field: leaving
  // it (blur) or leaving the screen (useFocusEffect cleanup below).
  function saveCurrentSearch(term: string) {
    const trimmedQuery = term.trim();
    if (trimmedQuery) setHistory(addSearchHistory(trimmedQuery));
  }

  function handleRemoveHistory(term: string) {
    setHistory(removeSearchHistoryEntry(term));
  }

  function handleClearHistory() {
    setHistory(clearSearchHistory());
  }

  // Tab screens stay mounted when you switch tabs, so without this the old
  // query/results would still be sitting there next time you come back to
  // the Search tab.
  useFocusEffect(
    useCallback(() => {
      return () => {
        saveCurrentSearch(queryRef.current);
        setQuery('');
        setDebouncedQuery('');
      };
    }, []),
  );

  return (
    <View style={styles.flex}>
      <AppHeader />

      <View style={styles.searchBox}>
        <Input
          value={query}
          onChangeText={setQuery}
          onBlur={() => saveCurrentSearch(query)}
          returnKeyType="search"
          placeholder="Axtar..."
          autoCorrect={false}
        />
      </View>

      {!query.trim() ? (
        history.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Son axtarışlar</Text>
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={styles.historyClear}>Təmizlə</Text>
              </TouchableOpacity>
            </View>
            {history.map(term => (
              <HistoryRow
                key={term}
                term={term}
                onPress={() => handleSelectHistory(term)}
                onRemove={() => handleRemoveHistory(term)}
              />
            ))}
          </View>
        )
      ) : loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : results.length === 0 ? (
        <Text style={styles.emptyText}>Heç bir nəticə tapılmadı</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => String(item.id)}
          style={styles.resultsList}
          contentContainerStyle={styles.results}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ResultRow product={item} onPress={() => setSelectedProduct(item)} />
          )}
        />
      )}

      <ProductDetailSheet
        product={selectedProduct}
        quantity={
          selectedProduct ? quantityForProduct(basket, selectedProduct.id) : 0
        }
        onClose={() => setSelectedProduct(null)}
        onAdd={() => selectedProduct && handleAdd(selectedProduct.id)}
      />
    </View>
  );
}

export default SearchScreen;
