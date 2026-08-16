import httpClient from '@shared/api/httpClient';
import type { ApiEnvelope, UserProfile } from '@typings/api';

export interface UpdateProfilePayload {
  full_name: string;
  address: string;
  img_url?: string;
  password?: string;
  password_repeat?: string;
}

export async function getProfile(): Promise<UserProfile> {
  const { data } = await httpClient.get<ApiEnvelope<UserProfile>>('/profile');
  return data.data;
}

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfile> {
  const { data } = await httpClient.put<ApiEnvelope<UserProfile>>(
    '/profile',
    payload,
  );
  return data.data;
}
