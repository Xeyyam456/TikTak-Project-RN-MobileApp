import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { BASE_URL, LANG } from '@shared/config/env';
import { showErrorToast } from '@shared/utils/toast';
import type { ApiEnvelope, AuthTokens } from '@typings/api';
import { resetToWelcome } from '../../navigation/navigationRef';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from './tokenStorage';

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const httpClient = axios.create({
  baseURL: `${BASE_URL}/api/tiktak`,
  headers: { 'Accept-Language': LANG },
});

httpClient.interceptors.request.use(async config => {
  const token = await getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function performRefresh(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post<ApiEnvelope<AuthTokens>>(
      `${BASE_URL}/api/tiktak/auth/refresh`,
      { refresh_token: refreshToken },
    );
    await setTokens(data.data.access_token, data.data.refresh_token);
    return data.data.access_token;
  } catch {
    return null;
  }
}

httpClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    // /auth/* calls (login, signup, the refresh call itself) must never enter
    // the refresh-and-retry dance — a 401 there means "wrong credentials" or
    // "refresh token is dead", not "session expired mid-use", and treating
    // it as the latter would boot a user back to Welcome while they're still
    // typing their password.
    const isAuthEndpoint = originalRequest?.url?.startsWith('/auth/');

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${newAccessToken}`,
        );
        return httpClient(originalRequest);
      }

      await clearTokens();
      showErrorToast('Sessiyanızın müddəti bitdi, yenidən daxil olun');
      resetToWelcome();
    }

    return Promise.reject(error);
  },
);

export default httpClient;
