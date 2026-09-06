import { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppHeader from '@shared/components/AppHeader';
import Input from '@shared/components/Input';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import type { Product } from '@typings/api';
import ProductDetailSheet from '../../home/ProductDetailSheet';
import SearchHistorySection from '../SearchHistorySection';
import SearchResultRow from '../SearchResultRow';
import SearchResultsSkeleton from '../SearchResultsSkeleton';
import useSearchHistory from '../hooks/useSearchHistory';
import useSearchQuery from '../hooks/useSearchQuery';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './SearchScreen.styles';

function SearchScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const basket = useBasketStore(state => state.basket);
  const addItem = useBasketStore(state => state.addItem);

  const history = useSearchHistory();
  const { query, setQuery, results, loading, searchNow } = useSearchQuery(history.save);

  function handleSelectHistory(term: string) {
    searchNow(term);
    history.save(term);
  }

  return (
    <View style={styles.flex}>
      <AppHeader />

      <View style={styles.searchBox}>
        <Input
          value={query}
          onChangeText={setQuery}
          onBlur={() => history.save(query)}
          returnKeyType="search"
          placeholder={t('search.placeholder')}
          autoCorrect={false}
        />
      </View>

      {!query.trim() ? (
        <SearchHistorySection
          history={history.history}
          onSelect={handleSelectHistory}
          onRemove={history.remove}
          onClear={history.clear}
        />
      ) : loading ? (
        <SearchResultsSkeleton />
      ) : results.length === 0 ? (
        <Text style={styles.emptyText}>{t('search.noResults')}</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => String(item.id)}
          style={styles.resultsList}
          contentContainerStyle={styles.results}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SearchResultRow product={item} onPress={() => setSelectedProduct(item)} />
          )}
        />
      )}

      <ProductDetailSheet
        product={selectedProduct}
        quantity={
          selectedProduct ? quantityForProduct(basket, selectedProduct.id) : 0
        }
        onClose={() => setSelectedProduct(null)}
        onAdd={() => selectedProduct && addItem(selectedProduct)}
      />
    </View>
  );
}

export default SearchScreen;
