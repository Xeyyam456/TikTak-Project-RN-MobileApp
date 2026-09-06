import type { BasketItem } from '@typings/api';

export type BasketRowProps = {
  item: BasketItem;
  onIncrement: () => void;
  onDecrement: () => void;
};
