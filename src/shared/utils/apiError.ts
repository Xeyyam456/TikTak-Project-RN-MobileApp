import { isAxiosError } from 'axios';
import i18n from '@shared/i18n/i18n';

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? i18n.t('apiError.fallback');
  }
  return i18n.t('apiError.fallback');
}
