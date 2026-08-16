import httpClient from '@shared/api/httpClient';
import type { ApiEnvelope, Campaign } from '@typings/api';

export async function listCampaigns(): Promise<Campaign[]> {
  const { data } = await httpClient.get<ApiEnvelope<Campaign[]>>(
    '/campaigns',
  );
  return data.data;
}
