import i18n from '@shared/i18n/i18n';
import type { OrderStatus } from '@typings/api';

type OrderStatusMeta = {
  label: string;
  color: string;
  backgroundColor: string;
};

// Colors are decorative status-badge accents, not themed — same reasoning
// as every other one-off pastel in this codebase. `label` is resolved via
// i18n.t() inside the function below (not baked into this table) so it
// always reflects the current language, not whatever was active when this
// module first loaded.
const ORDER_STATUS_COLORS: Record<OrderStatus, { color: string; backgroundColor: string }> = {
  PENDING: { color: '#C68A1E', backgroundColor: '#FCF1DC' },
  CONFIRMED: { color: '#3D7CE0', backgroundColor: '#E6EEFC' },
  PREPARING: { color: '#8E4FC9', backgroundColor: '#F1E6FA' },
  READY: { color: '#1AA89A', backgroundColor: '#DEF5F2' },
  DELIVERED: { color: '#5C9A2E', backgroundColor: '#E9F5DD' },
  CANCELLED: { color: '#D14444', backgroundColor: '#FBE6E6' },
};

const ORDER_STATUS_LABEL_KEYS: Record<OrderStatus, string> = {
  PENDING: 'orderStatus.pending',
  CONFIRMED: 'orderStatus.confirmed',
  PREPARING: 'orderStatus.preparing',
  READY: 'orderStatus.ready',
  DELIVERED: 'orderStatus.delivered',
  CANCELLED: 'orderStatus.cancelled',
};

export function getOrderStatusMeta(status: OrderStatus): OrderStatusMeta {
  return { ...ORDER_STATUS_COLORS[status], label: i18n.t(ORDER_STATUS_LABEL_KEYS[status]) };
}

export function formatOrderDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}
