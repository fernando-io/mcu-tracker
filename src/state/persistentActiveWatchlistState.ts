import {
  createActiveWatchlistState,
  type ActiveWatchlistState,
  type ActiveWatchlistStateOptions,
} from "./activeWatchlistState";
import { getPersistedActiveWatchlistId, persistActiveWatchlistId } from "./activeWatchlistPersistence";

export type PersistentActiveWatchlistStateOptions = Omit<ActiveWatchlistStateOptions, "initialWatchlistId">;

export function createPersistentActiveWatchlistState(
  options: PersistentActiveWatchlistStateOptions = {},
): ActiveWatchlistState {
  const persistedWatchlistId = getPersistedActiveWatchlistId();
  const activeWatchlistState = createActiveWatchlistState({
    ...options,
    initialWatchlistId: persistedWatchlistId,
  });
  const activeWatchlistId = activeWatchlistState.getActiveWatchlist().id;

  if (persistedWatchlistId && persistedWatchlistId !== activeWatchlistId) {
    persistActiveWatchlistId(activeWatchlistId);
  }

  return {
    getActiveWatchlist: activeWatchlistState.getActiveWatchlist,
    setActiveWatchlist: watchlistId => {
      const activeWatchlist = activeWatchlistState.setActiveWatchlist(watchlistId);
      persistActiveWatchlistId(activeWatchlist.id);
      return activeWatchlist;
    },
  };
}