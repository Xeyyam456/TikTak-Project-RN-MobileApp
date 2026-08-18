import httpClient from '@shared/api/httpClient';
import type { ApiEnvelope, Basket } from '@typings/api';

export async function getBasket(): Promise<Basket> {
  const { data } = await httpClient.get<ApiEnvelope<Basket>>('/basket');
  return data.data;
}

export async function addToBasket(productId: number): Promise<Basket> {
  const { data } = await httpClient.post<ApiEnvelope<Basket>>(
    `/basket/${productId}/add`,
  );
  return data.data;
}

export async function removeFromBasket(productId: number): Promise<Basket> {
  const { data } = await httpClient.post<ApiEnvelope<Basket>>(
    `/basket/${productId}/remove`,
  );
  return data.data;
}

export async function removeAllFromBasket(productId: number): Promise<Basket> {
  const { data } = await httpClient.delete<ApiEnvelope<Basket>>(
    `/basket/${productId}/remove-all`,
  );
  return data.data;
}

export async function clearBasket(): Promise<Basket> {
  const { data } = await httpClient.delete<ApiEnvelope<Basket>>(
    '/basket/clear',
  );
  return data.data;
}
