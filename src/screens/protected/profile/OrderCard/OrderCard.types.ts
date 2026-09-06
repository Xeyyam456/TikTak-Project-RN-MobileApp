import type { Order } from '@typings/api';

export type OrderCardProps = {
  order: Order;
  onPress: () => void;
};
