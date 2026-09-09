import type { Movie } from "../types";
import type { WatchlistProductionId } from "../watchlists";
import type { ProductionRetrievalApi } from "./productionRetrieval";

export type IsProductionCompleted = (productionId: WatchlistProductionId) => boolean;

export interface WatchlistProgressSummary {
  totalProductions: number;
  completedProductions: number;
  remainingProductions: number;
  completionPercentage: number;
  firstProduction: Movie | undefined;
  lastProduction: Movie | undefined;
}

export function getWatchlistTotalProductions(productionsApi: ProductionRetrievalApi): number {
  return productionsApi.getProductionIds().length;
}

export function getWatchlistCompletedProductions(
  productionsApi: ProductionRetrievalApi,
  isCompleted: IsProductionCompleted,
): number {
  return productionsApi.getProductionIds().filter(isCompleted).length;
}

export function getWatchlistRemainingProductions(
  productionsApi: ProductionRetrievalApi,
  isCompleted: IsProductionCompleted,
): number {
  return getWatchlistTotalProductions(productionsApi) - getWatchlistCompletedProductions(productionsApi, isCompleted);
}

export function getWatchlistCompletionPercentage(
  productionsApi: ProductionRetrievalApi,
  isCompleted: IsProductionCompleted,
): number {
  const total = getWatchlistTotalProductions(productionsApi);
  if (total === 0) {
    return 0;
  }

  return Math.round((getWatchlistCompletedProductions(productionsApi, isCompleted) / total) * 100);
}

export function getWatchlistFirstProduction(productionsApi: ProductionRetrievalApi): Movie | undefined {
  return productionsApi.getProductions()[0];
}

export function getWatchlistLastProduction(productionsApi: ProductionRetrievalApi): Movie | undefined {
  const productions = productionsApi.getProductions();
  return productions[productions.length - 1];
}

export function getWatchlistProgressSummary(
  productionsApi: ProductionRetrievalApi,
  isCompleted: IsProductionCompleted,
): WatchlistProgressSummary {
  const totalProductions = getWatchlistTotalProductions(productionsApi);
  const completedProductions = getWatchlistCompletedProductions(productionsApi, isCompleted);

  return {
    totalProductions,
    completedProductions,
    remainingProductions: totalProductions - completedProductions,
    completionPercentage: totalProductions === 0 ? 0 : Math.round((completedProductions / totalProductions) * 100),
    firstProduction: getWatchlistFirstProduction(productionsApi),
    lastProduction: getWatchlistLastProduction(productionsApi),
  };
}