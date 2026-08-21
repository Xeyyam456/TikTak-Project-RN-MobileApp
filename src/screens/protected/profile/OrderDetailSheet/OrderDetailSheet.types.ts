import type { Order } from '@typings/api';

export type OrderDetailSheetProps = {
  order: Order | null;
  onClose: () => void;
};
