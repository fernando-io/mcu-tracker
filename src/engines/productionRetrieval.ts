import type { Movie } from "../types";
import {
  findWatchlistProduction,
  getWatchlistProductionIds,
  getWatchlistProductionIndex,
  getWatchlistProductionPosition,
  hasWatchlistProduction,
} from "../selectors/watchlists";
import type { Watchlist, WatchlistProductionId } from "../watchlists";

export interface ProductionRetrievalApi {
  getProductionIds: () => readonly WatchlistProductionId[];
  getProductions: () => Movie[];
  hasProduction: (productionId: WatchlistProductionId) => boolean;
  getProduction: (productionId: WatchlistProductionId) => Movie | undefined;
  getNextProduction: (productionId: WatchlistProductionId) => Movie | undefined;
  getPreviousProduction: (productionId: WatchlistProductionId) => Movie | undefined;
  getProductionIndex: (productionId: WatchlistProductionId) => number;
  getProductionPosition: (productionId: WatchlistProductionId) => number | undefined;
}

export function createProductionRetrievalApi(
  watchlist: Watchlist,
  productionCatalog: readonly Movie[],
): ProductionRetrievalApi {
  const productionsById = new Map(productionCatalog.map(production => [production.n, production]));

  function getProductionIds() {
    return getWatchlistProductionIds(watchlist);
  }

  function getProduction(productionId: WatchlistProductionId) {
    const watchlistProductionId = findWatchlistProduction(watchlist, productionId);
    return watchlistProductionId !== undefined ? productionsById.get(watchlistProductionId) : undefined;
  }

  function getProductions() {
    return getProductionIds()
      .map(productionId => productionsById.get(productionId))
      .filter((production): production is Movie => Boolean(production));
  }

  function getAdjacentProduction(productionId: WatchlistProductionId, offset: -1 | 1) {
    const currentIndex = getWatchlistProductionIndex(watchlist, productionId);
    if (currentIndex < 0) {
      return undefined;
    }

    const adjacentProductionId = getProductionIds()[currentIndex + offset];
    return adjacentProductionId !== undefined ? productionsById.get(adjacentProductionId) : undefined;
  }

  return {
    getProductionIds,
    getProductions,
    hasProduction: productionId => hasWatchlistProduction(watchlist, productionId),
    getProduction,
    getNextProduction: productionId => getAdjacentProduction(productionId, 1),
    getPreviousProduction: productionId => getAdjacentProduction(productionId, -1),
    getProductionIndex: productionId => getWatchlistProductionIndex(watchlist, productionId),
    getProductionPosition: productionId => getWatchlistProductionPosition(watchlist, productionId),
  };
}