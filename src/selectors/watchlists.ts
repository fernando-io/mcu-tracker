import type { Watchlist, WatchlistProductionId } from "../watchlists";

export function getWatchlistProductionIds(watchlist: Watchlist): readonly WatchlistProductionId[] {
  return watchlist.productions;
}

export function hasWatchlistProduction(watchlist: Watchlist, productionId: WatchlistProductionId): boolean {
  return watchlist.productions.includes(productionId);
}

export function findWatchlistProduction(watchlist: Watchlist, productionId: WatchlistProductionId): WatchlistProductionId | undefined {
  return watchlist.productions.find(item => item === productionId);
}

export function getWatchlistProductionIndex(watchlist: Watchlist, productionId: WatchlistProductionId): number {
  return watchlist.productions.indexOf(productionId);
}

export function getWatchlistProductionPosition(watchlist: Watchlist, productionId: WatchlistProductionId): number | undefined {
  const index = getWatchlistProductionIndex(watchlist, productionId);
  return index >= 0 ? index + 1 : undefined;
}