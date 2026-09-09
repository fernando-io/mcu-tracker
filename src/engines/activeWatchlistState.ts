import type { Movie } from "../types";
import { defaultWatchlist } from "../watchlists/defaultWatchlist";
import { officialWatchlists } from "../watchlists/officialWatchlists";
import type { Watchlist } from "../watchlists/watchlist.types";
import { createActiveWatchlist, type ActiveWatchlist } from "./activeWatchlist";
import type { IsProductionCompleted } from "./watchlistProgress";

export interface ActiveWatchlistStateOptions {
  productionCatalog: readonly Movie[];
  isCompleted: IsProductionCompleted;
  watchlists?: readonly Watchlist[];
  initialWatchlistId?: Watchlist["id"];
}

export interface ActiveWatchlistState {
  getActiveWatchlist: () => ActiveWatchlist;
  setActiveWatchlist: (watchlistId: Watchlist["id"]) => ActiveWatchlist;
}

export function createActiveWatchlistState({
  productionCatalog,
  isCompleted,
  watchlists = officialWatchlists,
  initialWatchlistId,
}: ActiveWatchlistStateOptions): ActiveWatchlistState {
  const watchlistsById = new Map(watchlists.map(watchlist => [watchlist.id, watchlist]));

  if (!watchlistsById.has(defaultWatchlist.id)) {
    throw new Error("A watchlist padrão precisa estar disponível.");
  }

  const initialWatchlist = watchlistsById.get(initialWatchlistId ?? defaultWatchlist.id) ?? defaultWatchlist;
  let activeWatchlist = createActiveWatchlist(initialWatchlist, productionCatalog, isCompleted);

  return {
    getActiveWatchlist: () => activeWatchlist,
    setActiveWatchlist: watchlistId => {
      const watchlist = watchlistsById.get(watchlistId);

      if (!watchlist) {
        throw new Error(`Watchlist não encontrada: ${watchlistId}`);
      }

      activeWatchlist = createActiveWatchlist(watchlist, productionCatalog, isCompleted);
      return activeWatchlist;
    },
  };
}