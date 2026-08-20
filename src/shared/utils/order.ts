import type { OrderStatus } from '@typings/api';

type OrderStatusMeta = {
  label: string;
  color: string;
  backgroundColor: string;
};

const ORDER_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  PENDING: { label: 'Qəbul edilib', color: '#C68A1E', backgroundColor: '#FCF1DC' },
  CONFIRMED: { label: 'Təsdiqləndi', color: '#3D7CE0', backgroundColor: '#E6EEFC' },
  PREPARING: { label: 'Hazırlanır', color: '#8E4FC9', backgroundColor: '#F1E6FA' },
  READY: { label: 'Hazırdır', color: '#1AA89A', backgroundColor: '#DEF5F2' },
  DELIVERED: { label: 'Çatdırıldı', color: '#5C9A2E', backgroundColor: '#E9F5DD' },
  CANCELLED: { label: 'Ləğv edildi', color: '#D14444', backgroundColor: '#FBE6E6' },
};

export function getOrderStatusMeta(status: OrderStatus): OrderStatusMeta {
  return ORDER_STATUS_META[status];
}

export function formatOrderDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}
