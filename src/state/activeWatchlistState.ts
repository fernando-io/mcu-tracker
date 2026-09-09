import { defaultWatchlist } from "../watchlists/defaultWatchlist";
import { officialWatchlists } from "../watchlists/officialWatchlists";
import type { Watchlist } from "../watchlists/watchlist.types";

export interface ActiveWatchlistStateOptions {
  watchlists?: readonly Watchlist[];
  initialWatchlistId?: Watchlist["id"];
}

export interface ActiveWatchlistState {
  getActiveWatchlist: () => Watchlist;
  setActiveWatchlist: (watchlistId: Watchlist["id"]) => Watchlist;
}

export function createActiveWatchlistState({
  watchlists = officialWatchlists,
  initialWatchlistId,
}: ActiveWatchlistStateOptions = {}): ActiveWatchlistState {
  const watchlistsById = new Map(watchlists.map(watchlist => [watchlist.id, watchlist]));
  const fallbackWatchlist = watchlistsById.get(defaultWatchlist.id);

  if (!fallbackWatchlist) {
    throw new Error("A watchlist padrão precisa estar disponível.");
  }

  let activeWatchlist = watchlistsById.get(initialWatchlistId ?? fallbackWatchlist.id) ?? fallbackWatchlist;

  return {
    getActiveWatchlist: () => activeWatchlist,
    setActiveWatchlist: watchlistId => {
      const watchlist = watchlistsById.get(watchlistId);

      if (!watchlist) {
        throw new Error(`Watchlist não encontrada: ${watchlistId}`);
      }

      activeWatchlist = watchlist;
      return activeWatchlist;
    },
  };
}