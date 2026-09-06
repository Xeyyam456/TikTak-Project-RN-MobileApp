import type { Product } from '@typings/api';

export type SearchResultRowProps = {
  product: Product;
  onPress: () => void;
};
