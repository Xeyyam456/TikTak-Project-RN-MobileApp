import httpClient from '@shared/api/httpClient';
import type { ApiEnvelope, Category } from '@typings/api';

export async function listCategories(): Promise<Category[]> {
  const { data } = await httpClient.get<ApiEnvelope<Category[]>>(
    '/categories',
  );
  return data.data;
}
