import { useMemo } from "react";
import { productions } from "../data/movies";
import type { ActiveWatchlist } from "../engines/activeWatchlist";
import { createPersistentActiveWatchlistState } from "../watchlists";

export function useActiveWatchlist(watched: ReadonlySet<number>): ActiveWatchlist {
  return useMemo(() => {
    const activeWatchlistState = createPersistentActiveWatchlistState({
      productionCatalog: productions,
      isCompleted: productionId => watched.has(productionId),
    });

    return activeWatchlistState.getActiveWatchlist();
  }, [watched]);
}