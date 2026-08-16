import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'tiktak_access_token';
const REFRESH_TOKEN_KEY = 'tiktak_refresh_token';

export function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function setTokens(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  await AsyncStorage.setMany({
    [ACCESS_TOKEN_KEY]: accessToken,
    [REFRESH_TOKEN_KEY]: refreshToken,
  });
}

export async function clearTokens(): Promise<void> {
  await AsyncStorage.removeMany([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}
