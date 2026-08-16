import { isAxiosError } from 'axios';

const FALLBACK_MESSAGE = 'Xəta baş verdi, yenidən cəhd edin';

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? FALLBACK_MESSAGE;
  }
  return FALLBACK_MESSAGE;
}
