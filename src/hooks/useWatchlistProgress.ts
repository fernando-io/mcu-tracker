import { useCallback, useEffect, useState } from "react";
import type { ProgressState, WatchlistProgress } from "../types";
import {
  EMPTY_PROGRESS_STATE,
  getPersistedWatchlistProgress,
  persistWatchlistProgress,
} from "../state/watchlistProgressPersistence";
import type { Watchlist } from "../watchlists";

export interface WatchlistProgressController {
  progressByWatchlist: WatchlistProgress;
  updateProgress: (
    watchlistId: Watchlist["id"],
    update: (progress: ProgressState) => ProgressState,
  ) => void;
}

export function useWatchlistProgress(): WatchlistProgressController {
  const [progressByWatchlist, setProgressByWatchlist] = useState<WatchlistProgress>(getPersistedWatchlistProgress);

  useEffect(() => {
    persistWatchlistProgress(progressByWatchlist);
  }, [progressByWatchlist]);

  const updateProgress = useCallback((
    watchlistId: Watchlist["id"],
    update: (progress: ProgressState) => ProgressState,
  ) => {
    setProgressByWatchlist(current => ({
      ...current,
      [watchlistId]: update(current[watchlistId] || EMPTY_PROGRESS_STATE),
    }));
  }, []);

  return { progressByWatchlist, updateProgress };
}
