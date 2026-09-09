export type WatchlistProductionId = number;

export type WatchlistKind = "official" | "custom";

export interface Watchlist {
  id: string;
  name: string;
  description: string;
  kind: WatchlistKind;
  productions: readonly WatchlistProductionId[];
}

export interface CustomWatchlistInput {
  name: string;
  description: string;
  productions?: readonly WatchlistProductionId[];
}