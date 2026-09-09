import { useCallback, useEffect, useMemo, useState } from "react";
import { productions } from "../data/movies";
import { createActiveWatchlist, type ActiveWatchlist } from "../engines/activeWatchlist";
import { createPersistentActiveWatchlistState } from "../state";
import { officialWatchlists, type Watchlist } from "../watchlists";

export interface UseActiveWatchlistOptions {
  watchlists?: readonly Watchlist[];
}

export interface ActiveWatchlistController {
  activeWatchlist: ActiveWatchlist;
  activateWatchlist: (watchlistId: Watchlist["id"]) => void;
}

export function useActiveWatchlist(
  watched: ReadonlySet<number>,
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
  const activeWatchlist = useMemo(
    () => createActiveWatchlist(selectedWatchlist, productions, productionId => watched.has(productionId)),
    [selectedWatchlist, activeWatchlistId, watched],
  );

  return { activeWatchlist, activateWatchlist };
}
