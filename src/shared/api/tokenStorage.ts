import { createMMKV, type MMKV } from 'react-native-mmkv';
import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN_KEY = 'tiktak_access_token';
const REFRESH_TOKEN_KEY = 'tiktak_refresh_token';
const REMEMBER_ME_KEY = 'tiktak_remember_me';
const KEYCHAIN_SERVICE = 'tiktak-mmkv-encryption-key';
const ENCRYPTION_KEY_LENGTH = 32; // bytes, for AES-256

let storage: MMKV | undefined;

function generateEncryptionKey(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < ENCRYPTION_KEY_LENGTH; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

// The MMKV encryption key itself is what needs real protection — storing it
// in Android Keystore / iOS Keychain (via react-native-keychain) means it
// never sits on disk as plain text, unlike the token data it protects.
async function getOrCreateEncryptionKey(): Promise<string> {
  const existing = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
  if (existing) {
    return existing.password;
  }
  const key = generateEncryptionKey();
  await Keychain.setGenericPassword('tiktak', key, { service: KEYCHAIN_SERVICE });
  return key;
}

// Keychain access is async (native Keystore call), which is why this whole
// module can no longer create its MMKV instance synchronously at import
// time. Callers must await this once, before app UI renders — see
// RootNavigator's loading gate — every other export here assumes it has
// already resolved.
export async function initTokenStorage(): Promise<void> {
  const encryptionKey = await getOrCreateEncryptionKey();
  storage = createMMKV({
    id: 'tiktak-storage',
    encryptionKey,
    encryptionType: 'AES-256',
  });

  // "Remember me" unchecked at login means the session should only survive
  // while the app process stays alive (backgrounding is fine), not a real
  // app restart. This module only re-runs on a fresh process, so clearing
  // here — once, right after storage is ready — is what makes a cold start
  // require login again without needing a separate in-memory-only token path.
  if (!getRememberMe()) {
    clearTokens();
  }
}

function requireStorage(): MMKV {
  if (!storage) {
    throw new Error('tokenStorage used before initTokenStorage() resolved');
  }
  return storage;
}

export function getAccessToken(): string | null {
  return requireStorage().getString(ACCESS_TOKEN_KEY) ?? null;
}

export function getRefreshToken(): string | null {
  return requireStorage().getString(REFRESH_TOKEN_KEY) ?? null;
}

export function setTokens(accessToken: string, refreshToken: string): void {
  requireStorage().set(ACCESS_TOKEN_KEY, accessToken);
  requireStorage().set(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  requireStorage().remove(ACCESS_TOKEN_KEY);
  requireStorage().remove(REFRESH_TOKEN_KEY);
}

export function setRememberMe(remember: boolean): void {
  requireStorage().set(REMEMBER_ME_KEY, remember);
}

export function getRememberMe(): boolean {
  return requireStorage().getBoolean(REMEMBER_ME_KEY) ?? false;
}
