import { MMKV } from 'react-native-mmkv';

const ACCESS_TOKEN_KEY = 'tiktak_access_token';
const REFRESH_TOKEN_KEY = 'tiktak_refresh_token';

export const storage = new MMKV({ id: 'tiktak-storage' });

export function getAccessToken(): string | null {
  return storage.getString(ACCESS_TOKEN_KEY) ?? null;
}

export function getRefreshToken(): string | null {
  return storage.getString(REFRESH_TOKEN_KEY) ?? null;
}

export function setTokens(accessToken: string, refreshToken: string): void {
  storage.set(ACCESS_TOKEN_KEY, accessToken);
  storage.set(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  storage.delete(ACCESS_TOKEN_KEY);
  storage.delete(REFRESH_TOKEN_KEY);
}
