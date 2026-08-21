import type { Product } from '@typings/api';

export type ProductDetailSheetProps = {
  product: Product | null;
  quantity: number;
  onClose: () => void;
  onAdd: () => void;
  onFavoriteChange?: (productId: number, isFavorite: boolean) => void;
};
