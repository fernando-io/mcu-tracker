import type { Watchlist } from "../watchlists";

const CUSTOM_WATCHLISTS_STORAGE_KEY = "mcu-tracker-custom-watchlists";

function isPersistedCustomWatchlist(value: unknown): value is Watchlist {
  if (!value || typeof value !== "object") {
    return false;
  }

  const watchlist = value as Partial<Watchlist>;

  return (
    typeof watchlist.id === "string"
    && typeof watchlist.name === "string"
    && typeof watchlist.description === "string"
    && watchlist.kind === "custom"
    && Array.isArray(watchlist.productions)
    && watchlist.productions.every(productionId => typeof productionId === "number")
  );
}

export function getPersistedCustomWatchlists(): Watchlist[] {
  try {
    const storedWatchlists = localStorage.getItem(CUSTOM_WATCHLISTS_STORAGE_KEY);

    if (!storedWatchlists) {
      return [];
    }

    const parsedWatchlists: unknown = JSON.parse(storedWatchlists);
    return Array.isArray(parsedWatchlists)
      ? parsedWatchlists.filter(isPersistedCustomWatchlist)
      : [];
  } catch {
    return [];
  }
}

export function persistCustomWatchlists(watchlists: readonly Watchlist[]): void {
  try {
    localStorage.setItem(CUSTOM_WATCHLISTS_STORAGE_KEY, JSON.stringify(watchlists));
  } catch {
    // Persistence is optional when browser storage is unavailable.
  }
}
