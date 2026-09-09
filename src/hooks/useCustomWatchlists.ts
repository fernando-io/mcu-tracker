import { useCallback, useEffect, useState } from "react";
import { productions } from "../data/movies";
import {
  addProductionsToCustomWatchlist,
  createCustomWatchlist,
  deleteCustomWatchlist,
  removeProductionsFromCustomWatchlist,
  reorderCustomWatchlistProductions,
  searchWatchlistProductions,
  updateCustomWatchlistDetails,
} from "../engines/customWatchlists";
import {
  getPersistedCustomWatchlists,
  persistCustomWatchlists,
} from "../state/customWatchlistPersistence";
import {
  currentCatalogWatchlist,
  officialWatchlists,
  type CustomWatchlistInput,
  type Watchlist,
  type WatchlistProductionId,
} from "../watchlists";
import type { Movie } from "../types";

function customWatchlistsFrom(watchlists: readonly Watchlist[]): Watchlist[] {
  return watchlists.filter(watchlist => watchlist.kind === "custom");
}

function withOfficialWatchlists(customWatchlists: readonly Watchlist[]): Watchlist[] {
  return [...officialWatchlists, ...customWatchlists];
}

function updateCustomWatchlists(
  currentWatchlists: readonly Watchlist[],
  update: (watchlists: readonly Watchlist[]) => Watchlist[],
): Watchlist[] {
  return customWatchlistsFrom(update(withOfficialWatchlists(currentWatchlists)));
}

export interface CustomWatchlistActions {
  customWatchlists: Watchlist[];
  createWatchlist: (input: CustomWatchlistInput) => void;
  updateWatchlist: (watchlistId: Watchlist["id"], details: Pick<Watchlist, "name" | "description">) => void;
  deleteWatchlist: (watchlistId: Watchlist["id"]) => void;
  addProductions: (watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => void;
  removeProductions: (watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => void;
  reorderProductions: (watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => void;
  searchAvailableProductions: (watchlist: Watchlist, query: string) => Movie[];
}

export function useCustomWatchlists(): CustomWatchlistActions {
  const [customWatchlists, setCustomWatchlists] = useState<Watchlist[]>(getPersistedCustomWatchlists);

  useEffect(() => {
    persistCustomWatchlists(customWatchlists);
  }, [customWatchlists]);

  const createWatchlist = useCallback((input: CustomWatchlistInput) => {
    setCustomWatchlists(currentWatchlists => updateCustomWatchlists(
      currentWatchlists,
      watchlists => createCustomWatchlist(watchlists, input),
    ));
  }, []);

  const updateWatchlist = useCallback((watchlistId: Watchlist["id"], details: Pick<Watchlist, "name" | "description">) => {
    setCustomWatchlists(currentWatchlists => updateCustomWatchlists(
      currentWatchlists,
      watchlists => updateCustomWatchlistDetails(watchlists, watchlistId, details),
    ));
  }, []);

  const deleteWatchlist = useCallback((watchlistId: Watchlist["id"]) => {
    setCustomWatchlists(currentWatchlists => updateCustomWatchlists(
      currentWatchlists,
      watchlists => deleteCustomWatchlist(watchlists, watchlistId),
    ));
  }, []);

  const addProductions = useCallback((watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => {
    setCustomWatchlists(currentWatchlists => updateCustomWatchlists(
      currentWatchlists,
      watchlists => addProductionsToCustomWatchlist(watchlists, watchlistId, productionIds),
    ));
  }, []);

  const removeProductions = useCallback((watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => {
    setCustomWatchlists(currentWatchlists => updateCustomWatchlists(
      currentWatchlists,
      watchlists => removeProductionsFromCustomWatchlist(watchlists, watchlistId, productionIds),
    ));
  }, []);

  const reorderProductions = useCallback((watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => {
    setCustomWatchlists(currentWatchlists => updateCustomWatchlists(
      currentWatchlists,
      watchlists => reorderCustomWatchlistProductions(watchlists, watchlistId, productionIds),
    ));
  }, []);

  const searchAvailableProductions = useCallback((watchlist: Watchlist, query: string) => (
    searchWatchlistProductions(currentCatalogWatchlist, productions, query)
      .filter(production => !watchlist.productions.includes(production.n))
  ), []);

  return {
    customWatchlists,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist,
    addProductions,
    removeProductions,
    reorderProductions,
    searchAvailableProductions,
  };
}
