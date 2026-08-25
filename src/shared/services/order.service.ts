import httpClient from '@shared/api/httpClient';
import type { ApiEnvelope, Order, PaymentMethod } from '@typings/api';

export interface CheckoutPayload {
  paymentMethod: PaymentMethod;
  address: string;
  phone: string;
  note?: string;
}

export async function checkout(payload: CheckoutPayload): Promise<Order> {
  const { data } = await httpClient.post<Order>('/orders/checkout', payload);
  console.log('[DEBUG checkout raw response]', JSON.stringify(data));
  return data;
}

export async function listOrders(): Promise<Order[]> {
  // docs/api.md documents this as a raw array with no envelope, but the
  // backend now wraps it in `{ message, data, result }` like most other
  // list endpoints (confirmed via raw response log while debugging orders
  // not showing up despite existing on the account) — same kind of
  // contract drift already seen once on GET /basket.
  const { data } = await httpClient.get<ApiEnvelope<Order[]>>('/orders/user');
  return data.data;
}

export async function getOrder(id: number): Promise<Order> {
  const { data } = await httpClient.get<ApiEnvelope<Order>>(
    `/orders/user/${id}`,
  );
  return data.data;
}
