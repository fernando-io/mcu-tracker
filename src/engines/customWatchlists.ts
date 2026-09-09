import type { Movie } from "../types";
import { createProductionRetrievalApi } from "./productionRetrieval";
import type { CustomWatchlistInput, Watchlist, WatchlistProductionId } from "../watchlists";

export type CustomWatchlistIdFactory = () => string;

const defaultIdFactory: CustomWatchlistIdFactory = () => `custom-${crypto.randomUUID()}`;

function findWatchlist(watchlists: readonly Watchlist[], watchlistId: string): Watchlist {
  const watchlist = watchlists.find(item => item.id === watchlistId);

  if (!watchlist) {
    throw new Error(`Watchlist não encontrada: ${watchlistId}`);
  }

  return watchlist;
}

function findCustomWatchlist(watchlists: readonly Watchlist[], watchlistId: string): Watchlist {
  const watchlist = findWatchlist(watchlists, watchlistId);

  if (watchlist.kind !== "custom") {
    throw new Error("Watchlists oficiais não podem ser alteradas.");
  }

  return watchlist;
}

function uniqueProductionIds(productionIds: readonly WatchlistProductionId[]): WatchlistProductionId[] {
  return [...new Set(productionIds)];
}

function createUniqueId(
  watchlists: readonly Watchlist[],
  createId: CustomWatchlistIdFactory,
): string {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const id = createId();

    if (!watchlists.some(watchlist => watchlist.id === id)) {
      return id;
    }
  }

  throw new Error("Não foi possível gerar um ID único para a watchlist.");
}

function createCustomWatchlistRecord(
  watchlists: readonly Watchlist[],
  input: CustomWatchlistInput,
  createId: CustomWatchlistIdFactory,
): Watchlist {
  return {
    id: createUniqueId(watchlists, createId),
    name: input.name,
    description: input.description,
    kind: "custom",
    productions: uniqueProductionIds(input.productions || []),
  };
}

function updateCustomWatchlist(
  watchlists: readonly Watchlist[],
  watchlistId: string,
  update: (watchlist: Watchlist) => Watchlist,
): Watchlist[] {
  const customWatchlist = findCustomWatchlist(watchlists, watchlistId);
  const updatedWatchlist = update(customWatchlist);

  return watchlists.map(watchlist => (
    watchlist.id === watchlistId ? updatedWatchlist : watchlist
  ));
}

function assertReorderedProductions(
  currentProductionIds: readonly WatchlistProductionId[],
  reorderedProductionIds: readonly WatchlistProductionId[],
): void {
  const uniqueReorderedProductionIds = uniqueProductionIds(reorderedProductionIds);
  const hasDuplicates = uniqueReorderedProductionIds.length !== reorderedProductionIds.length;
  const hasSameLength = reorderedProductionIds.length === currentProductionIds.length;
  const hasSameProductions = reorderedProductionIds.every(productionId => (
    currentProductionIds.includes(productionId)
  ));

  if (hasDuplicates || !hasSameLength || !hasSameProductions) {
    throw new Error("A reordenação deve conter exatamente as produções da watchlist, sem duplicações.");
  }
}

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function createCustomWatchlist(
  watchlists: readonly Watchlist[],
  input: CustomWatchlistInput,
  createId: CustomWatchlistIdFactory = defaultIdFactory,
): Watchlist[] {
  return [...watchlists, createCustomWatchlistRecord(watchlists, input, createId)];
}

export function renameCustomWatchlist(
  watchlists: readonly Watchlist[],
  watchlistId: string,
  name: string,
): Watchlist[] {
  return updateCustomWatchlist(watchlists, watchlistId, watchlist => ({ ...watchlist, name }));
}

export function duplicateCustomWatchlist(
  watchlists: readonly Watchlist[],
  watchlistId: string,
  createId: CustomWatchlistIdFactory = defaultIdFactory,
): Watchlist[] {
  const sourceWatchlist = findCustomWatchlist(watchlists, watchlistId);

  return createCustomWatchlist(watchlists, {
    name: `${sourceWatchlist.name} (cópia)`,
    description: sourceWatchlist.description,
    productions: sourceWatchlist.productions,
  }, createId);
}

export function deleteCustomWatchlist(
  watchlists: readonly Watchlist[],
  watchlistId: string,
): Watchlist[] {
  findCustomWatchlist(watchlists, watchlistId);

  return watchlists.filter(watchlist => watchlist.id !== watchlistId);
}

export function addProductionsToCustomWatchlist(
  watchlists: readonly Watchlist[],
  watchlistId: string,
  productionIds: readonly WatchlistProductionId[],
): Watchlist[] {
  return updateCustomWatchlist(watchlists, watchlistId, watchlist => ({
    ...watchlist,
    productions: uniqueProductionIds([...watchlist.productions, ...productionIds]),
  }));
}

export function removeProductionsFromCustomWatchlist(
  watchlists: readonly Watchlist[],
  watchlistId: string,
  productionIds: readonly WatchlistProductionId[],
): Watchlist[] {
  const productionIdsToRemove = new Set(productionIds);

  return updateCustomWatchlist(watchlists, watchlistId, watchlist => ({
    ...watchlist,
    productions: watchlist.productions.filter(productionId => !productionIdsToRemove.has(productionId)),
  }));
}

export function reorderCustomWatchlistProductions(
  watchlists: readonly Watchlist[],
  watchlistId: string,
  productionIds: readonly WatchlistProductionId[],
): Watchlist[] {
  return updateCustomWatchlist(watchlists, watchlistId, watchlist => {
    assertReorderedProductions(watchlist.productions, productionIds);

    return {
      ...watchlist,
      productions: [...productionIds],
    };
  });
}

export function searchWatchlistProductions(
  watchlist: Watchlist,
  productionCatalog: readonly Movie[],
  query: string,
): Movie[] {
  const normalizedQuery = normalizeSearchText(query);
  const productionApi = createProductionRetrievalApi(watchlist, productionCatalog);

  return productionApi.getProductions().filter(production => (
    normalizeSearchText(production.t).includes(normalizedQuery)
  ));
}
