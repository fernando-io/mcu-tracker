import { useMemo } from "react";
import type { ProgressState } from "../types";
import { EMPTY_PROGRESS_STATE } from "../state/watchlistProgressPersistence";
import { officialWatchlists } from "../watchlists";
import { useActiveWatchlist } from "./useActiveWatchlist";
import { useCustomWatchlists } from "./useCustomWatchlists";
import { useWatchlistProgress } from "./useWatchlistProgress";

export function useWatchlistJourney() {
  const customWatchlists = useCustomWatchlists();
  const watchlists = useMemo(
    () => [...officialWatchlists, ...customWatchlists.customWatchlists],
    [customWatchlists.customWatchlists],
  );
  const progress = useWatchlistProgress();
  const activeWatchlist = useActiveWatchlist(progress.progressByWatchlist, { watchlists });
  const progressState = progress.progressByWatchlist[activeWatchlist.activeWatchlist.watchlist.id]
    || EMPTY_PROGRESS_STATE;

  function updateActiveProgress(update: (progressState: ProgressState) => ProgressState) {
    progress.updateProgress(activeWatchlist.activeWatchlist.watchlist.id, update);
  }

  return {
    ...customWatchlists,
    ...activeWatchlist,
    watchlists,
    progressState,
    updateActiveProgress,
  };
}
