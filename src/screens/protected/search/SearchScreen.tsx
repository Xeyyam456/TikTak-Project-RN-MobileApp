import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AppHeader from '@shared/components/AppHeader';
import Input from '@shared/components/Input';
import { listProducts } from '@shared/services/product.service';
import { quantityForProduct, useBasketStore } from '@shared/store/basket.store';
import type { Product } from '@typings/api';
import { FONTS } from '../../../theme/fonts';
import ProductDetailSheet from '../home/ProductDetailSheet';

const HORIZONTAL_PADDING = 15;
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

function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const basket = useBasketStore(state => state.basket);
  const addItem = useBasketStore(state => state.addItem);

  // Debouncing only stops queued timeouts from piling up — if the user
  // pauses mid-typing (e.g. "al", pause, "ma"), two requests can still be
  // in flight at once, and a slower response for the earlier, broader query
  // can land after the later one and overwrite it with stale results. Track
  // the most recently *fired* query and drop any response that isn't for it.
  const latestQueryRef = useRef('');

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      latestQueryRef.current = '';
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      latestQueryRef.current = trimmed;
      const lowerTrimmed = trimmed.toLowerCase();
      listProducts({ search: trimmed })
        .then(response => {
          if (latestQueryRef.current !== trimmed) return;
          // The backend's `search` param apparently matches on more than
          // just title (e.g. searching "alma" returned "Ciyelek"), so
          // narrow to title-only matches client-side.
          setResults(
            response.data.filter(product =>
              product.title.toLowerCase().includes(lowerTrimmed),
            ),
          );
        })
        .finally(() => {
          if (latestQueryRef.current === trimmed) setLoading(false);
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query]);

  async function handleAdd(productId: number) {
    await addItem(productId);
  }

  // Tab screens stay mounted when you switch tabs, so without this the old
  // query/results would still be sitting there next time you come back to
  // the Search tab.
  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery('');
        setResults([]);
      };
    }, []),
  );

  return (
    <View style={styles.flex}>
      <AppHeader />

      <View style={styles.content}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Axtar..."
          autoCorrect={false}
        />

        {loading ? (
          <ActivityIndicator color="#7BC043" style={styles.loader} />
        ) : query.trim() && results.length === 0 ? (
          <Text style={styles.emptyText}>Heç bir nəticə tapılmadı</Text>
        ) : (
          <View style={styles.results}>
            {results.map(product => (
              <ResultRow
                key={product.id}
                product={product}
                onPress={() => setSelectedProduct(product)}
              />
            ))}
          </View>
        )}
      </View>

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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 14,
  },
  loader: {
    marginTop: 32,
  },
  emptyText: {
    marginTop: 32,
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  results: {
    marginTop: 18,
    gap: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: FONTS.semiBold,
  },
  rowPrice: {
    fontSize: 13,
    color: '#9B9B9B',
    fontFamily: FONTS.regular,
  },
});

export default SearchScreen;
