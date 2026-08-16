import httpClient from '@shared/api/httpClient';
import type { Order, PaymentMethod } from '@typings/api';

export interface CheckoutPayload {
  paymentMethod: PaymentMethod;
  address: string;
  phone: string;
  note?: string;
}

export async function checkout(payload: CheckoutPayload): Promise<Order> {
  const { data } = await httpClient.post<Order>('/orders/checkout', payload);
  return data;
}

export async function listOrders(): Promise<Order[]> {
  const { data } = await httpClient.get<Order[]>('/orders/user');
  return data;
}

export async function getOrder(id: number): Promise<Order> {
  const { data } = await httpClient.get<Order>(`/orders/user/${id}`);
  return data;
}
