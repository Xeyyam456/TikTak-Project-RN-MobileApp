import type { Product } from '@typings/api';

export type ProductCardProps = {
  product: Product;
  quantity: number;
  onPress: () => void;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};
