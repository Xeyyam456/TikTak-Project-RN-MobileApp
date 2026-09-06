import { useState } from 'react';
import {
  addSearchHistory,
  clearSearchHistory,
  getSearchHistory,
  removeSearchHistoryEntry,
} from '@shared/utils/searchHistory';

/** Recent-search terms, mirroring the MMKV-backed list in memory. */
export default function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());

  // Recording on every debounce tick (or requiring an explicit submit
  // button) both save typing-in-progress fragments — pausing mid-word while
  // typing "alma" would save "al" as a separate entry from "alma". Instead
  // save once, only when the user is actually done with the field: leaving
  // it (blur) or leaving the screen.
  function save(term: string) {
    const trimmed = term.trim();
    if (trimmed) setHistory(addSearchHistory(trimmed));
  }

  return {
    history,
    save,
    remove: (term: string) => setHistory(removeSearchHistoryEntry(term)),
    clear: () => setHistory(clearSearchHistory()),
  };
}
