import { productions } from "../data/movies";
import type { Watchlist } from "./watchlist.types";

export const currentCatalogWatchlist: Watchlist = {
  id: "current-catalog",
  name: "Catálogo atual",
  description: "Todas as produções atualmente disponíveis no MCU Tracker.",
  kind: "official",
  productions: productions.map(production => production.n),
};

export const officialWatchlists: Watchlist[] = [currentCatalogWatchlist];