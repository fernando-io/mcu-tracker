const ACTIVE_WATCHLIST_STORAGE_KEY = "mcu-tracker-active-watchlist";

export function getPersistedActiveWatchlistId(): string | undefined {
  try {
    return localStorage.getItem(ACTIVE_WATCHLIST_STORAGE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export function persistActiveWatchlistId(watchlistId: string): void {
  try {
    localStorage.setItem(ACTIVE_WATCHLIST_STORAGE_KEY, watchlistId);
  } catch {
    // Persistence is optional when browser storage is unavailable.
  }
}