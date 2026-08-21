import httpClient from '@shared/api/httpClient';
import { clearTokens, setRememberMe, setTokens } from '@shared/api/tokenStorage';
import type { ApiEnvelope, AuthTokens, UserProfile } from '@typings/api';

export interface SignupPayload {
  full_name: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginResponse {
  tokens: AuthTokens;
  profile: UserProfile;
}

export async function signup(payload: SignupPayload): Promise<void> {
  await httpClient.post<ApiEnvelope<null>>('/auth/signup', payload);
}

export async function login(
  payload: LoginPayload,
  rememberMe: boolean,
): Promise<LoginResponse> {
  const { data } = await httpClient.post<ApiEnvelope<LoginResponse>>(
    '/auth/login',
    payload,
  );
  setRememberMe(rememberMe);
  await setTokens(data.data.tokens.access_token, data.data.tokens.refresh_token);
  return data.data;
}

export async function logout(): Promise<void> {
  await clearTokens();
}
