import { useCallback, useEffect, useMemo, useState } from "react";
import { productions } from "../data/movies";
import { createActiveWatchlist, type ActiveWatchlist } from "../engines/activeWatchlist";
import { createPersistentActiveWatchlistState } from "../state";
import { EMPTY_PROGRESS_STATE } from "../state/watchlistProgressPersistence";
import type { WatchlistProgress } from "../types";
import { officialWatchlists, type Watchlist } from "../watchlists";

export interface UseActiveWatchlistOptions {
  watchlists?: readonly Watchlist[];
}

export interface ActiveWatchlistController {
  activeWatchlist: ActiveWatchlist;
  watched: Set<number>;
  activateWatchlist: (watchlistId: Watchlist["id"]) => void;
}

export function useActiveWatchlist(
  progressByWatchlist: WatchlistProgress,
  { watchlists = officialWatchlists }: UseActiveWatchlistOptions = {},
): ActiveWatchlistController {
  const activeWatchlistState = useMemo(
    () => createPersistentActiveWatchlistState({ watchlists }),
    [watchlists],
  );
  const [activeWatchlistId, setActiveWatchlistId] = useState(
    () => activeWatchlistState.getActiveWatchlist().id,
  );

  useEffect(() => {
    setActiveWatchlistId(activeWatchlistState.getActiveWatchlist().id);
  }, [activeWatchlistState]);

  const activateWatchlist = useCallback((watchlistId: Watchlist["id"]) => {
    const watchlist = activeWatchlistState.setActiveWatchlist(watchlistId);
    setActiveWatchlistId(watchlist.id);
  }, [activeWatchlistState]);

  const selectedWatchlist = activeWatchlistState.getActiveWatchlist();
  const progressState = progressByWatchlist[selectedWatchlist.id] || EMPTY_PROGRESS_STATE;
  const watched = useMemo(
    () => new Set(selectedWatchlist.productions.filter(productionId => progressState.watched.includes(productionId))),
    [progressState.watched, selectedWatchlist.productions],
  );
  const activeWatchlist = useMemo(
    () => createActiveWatchlist(selectedWatchlist, productions, productionId => watched.has(productionId)),
    [selectedWatchlist, watched],
  );

  return { activeWatchlist, watched, activateWatchlist };
}
