import { createMMKV } from 'react-native-mmkv';

// Deliberately a separate, unencrypted MMKV instance from tokenStorage's —
// recent search terms aren't sensitive, and keeping this one synchronous
// (no Keystore round-trip) means SearchScreen can read it immediately on
// mount instead of waiting on the same async gate as auth tokens.
const storage = createMMKV({ id: 'tiktak-search-history' });

const HISTORY_KEY = 'recent_searches';
const MAX_HISTORY = 10;

export function getSearchHistory(): string[] {
  const raw = storage.getString(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addSearchHistory(term: string): string[] {
  const trimmed = term.trim();
  if (!trimmed) return getSearchHistory();

  const current = getSearchHistory();
  const next = [
    trimmed,
    ...current.filter(entry => entry.toLowerCase() !== trimmed.toLowerCase()),
  ].slice(0, MAX_HISTORY);

  storage.set(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function removeSearchHistoryEntry(term: string): string[] {
  const next = getSearchHistory().filter(entry => entry !== term);
  storage.set(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function clearSearchHistory(): string[] {
  storage.remove(HISTORY_KEY);
  return [];
}
