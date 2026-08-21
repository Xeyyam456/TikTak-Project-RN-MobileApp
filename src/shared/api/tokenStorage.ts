import { createMMKV } from 'react-native-mmkv';

const ACCESS_TOKEN_KEY = 'tiktak_access_token';
const REFRESH_TOKEN_KEY = 'tiktak_refresh_token';
const REMEMBER_ME_KEY = 'tiktak_remember_me';

export const storage = createMMKV({ id: 'tiktak-storage' });

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
  storage.remove(ACCESS_TOKEN_KEY);
  storage.remove(REFRESH_TOKEN_KEY);
}

export function setRememberMe(remember: boolean): void {
  storage.set(REMEMBER_ME_KEY, remember);
}

export function getRememberMe(): boolean {
  return storage.getBoolean(REMEMBER_ME_KEY) ?? false;
}

// "Remember me" unchecked at login means the session should only survive
// while the app process stays alive (backgrounding is fine), not a real
// app restart. This module only re-runs on a fresh process, so clearing
// here — once, at import time — is what makes a cold start require login
// again without needing a separate in-memory-only token path.
if (!getRememberMe()) {
  clearTokens();
}
