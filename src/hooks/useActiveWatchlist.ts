import { useMemo } from "react";
import { productions } from "../data/movies";
import { createActiveWatchlist, type ActiveWatchlist } from "../engines/activeWatchlist";
import { createPersistentActiveWatchlistState } from "../state";

export function useActiveWatchlist(watched: ReadonlySet<number>): ActiveWatchlist {
  const activeWatchlistState = useMemo(() => createPersistentActiveWatchlistState(), []);
  const selectedWatchlist = activeWatchlistState.getActiveWatchlist();

  return useMemo(
    () => createActiveWatchlist(selectedWatchlist, productions, productionId => watched.has(productionId)),
    [selectedWatchlist, watched],
  );
}