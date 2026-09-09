import type { CustomWatchlistInput, Watchlist } from "../watchlists";

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
    productions: [...(input.productions || [])],
  };
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
  findCustomWatchlist(watchlists, watchlistId);

  return watchlists.map(watchlist => (
    watchlist.id === watchlistId ? { ...watchlist, name } : watchlist
  ));
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
