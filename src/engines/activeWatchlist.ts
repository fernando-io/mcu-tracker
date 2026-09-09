import type { Movie } from "../types";
import type { Watchlist } from "../watchlists";
import { createProductionRetrievalApi, type ProductionRetrievalApi } from "./productionRetrieval";
import {
  getWatchlistCompletedProductions,
  getWatchlistCompletionPercentage,
  getWatchlistFirstProduction,
  getWatchlistLastProduction,
  getWatchlistProgressSummary,
  getWatchlistRemainingProductions,
  getWatchlistTotalProductions,
  type IsProductionCompleted,
  type WatchlistProgressSummary,
} from "./watchlistProgress";

export interface ActiveWatchlist extends ProductionRetrievalApi {
  readonly watchlist: Watchlist;
  getTotalProductions: () => number;
  getCompletedProductions: () => number;
  getRemainingProductions: () => number;
  getCompletionPercentage: () => number;
  getFirstProduction: () => Movie | undefined;
  getLastProduction: () => Movie | undefined;
  getProgressSummary: () => WatchlistProgressSummary;
}

export function createActiveWatchlist(
  watchlist: Watchlist,
  productionCatalog: readonly Movie[],
  isCompleted: IsProductionCompleted,
): ActiveWatchlist {
  const productionsApi = createProductionRetrievalApi(watchlist, productionCatalog);

  return {
    watchlist,
    ...productionsApi,
    getTotalProductions: () => getWatchlistTotalProductions(productionsApi),
    getCompletedProductions: () => getWatchlistCompletedProductions(productionsApi, isCompleted),
    getRemainingProductions: () => getWatchlistRemainingProductions(productionsApi, isCompleted),
    getCompletionPercentage: () => getWatchlistCompletionPercentage(productionsApi, isCompleted),
    getFirstProduction: () => getWatchlistFirstProduction(productionsApi),
    getLastProduction: () => getWatchlistLastProduction(productionsApi),
    getProgressSummary: () => getWatchlistProgressSummary(productionsApi, isCompleted),
  };
}