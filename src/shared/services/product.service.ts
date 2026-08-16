import httpClient from '@shared/api/httpClient';
import type {
  ApiEnvelope,
  PaginatedEnvelope,
  Product,
  ProductDetail,
} from '@typings/api';

export interface ListProductsParams {
  limit?: number;
  page?: number;
  search?: string;
}

export async function listProducts(
  params?: ListProductsParams,
): Promise<PaginatedEnvelope<Product>> {
  const { data } = await httpClient.get<PaginatedEnvelope<Product>>(
    '/products',
    { params },
  );
  return data;
}

export async function getProduct(id: number): Promise<ProductDetail> {
  const { data } = await httpClient.get<ApiEnvelope<ProductDetail>>(
    `/products/${id}`,
  );
  return data.data;
}

export async function toggleFavorite(id: number): Promise<void> {
  await httpClient.post(`/products/${id}/favorite`);
}

export async function listFavorites(): Promise<Product[]> {
  const { data } = await httpClient.get<ApiEnvelope<Product[]>>(
    '/products/favorites',
  );
  return data.data;
}
