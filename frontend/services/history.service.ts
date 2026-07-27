import { getToken } from "@/services/auth.service";

export interface SearchHistoryItem {
  id: string;
  query: string;
  resultsCount: number;
  searchedAt: string;
}

function getHistoryKey(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return `pricepilot_history_${payload.sub || payload.email}`;
  } catch {
    return null;
  }
}

export function getSearchHistory(): SearchHistoryItem[] {
  const key = getHistoryKey();
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToHistory(query: string, resultsCount: number): void {
  const key = getHistoryKey();
  if (!key) return;

  const history = getSearchHistory();

  // Don't add duplicate consecutive searches
  if (history.length > 0 && history[0].query.toLowerCase() === query.toLowerCase()) {
    return;
  }

  const newEntry: SearchHistoryItem = {
    id: crypto.randomUUID(),
    query,
    resultsCount,
    searchedAt: new Date().toISOString(),
  };

  // Keep max 50 entries
  history.unshift(newEntry);
  if (history.length > 50) history.pop();

  localStorage.setItem(key, JSON.stringify(history));
}

export function removeFromHistory(id: string): void {
  const key = getHistoryKey();
  if (!key) return;

  const history = getSearchHistory();
  const filtered = history.filter((h) => h.id !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
}

export function clearHistory(): void {
  const key = getHistoryKey();
  if (key) localStorage.removeItem(key);
}
