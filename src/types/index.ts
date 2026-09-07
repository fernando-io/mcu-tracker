export type Priority = "essential" | "recommended" | "future";

export interface Movie {
  s: string;
  n: number;
  t: string;
  p: Priority;
  type: string;
  sum: string;
  date?: string;
}

export interface Character {
  id: string;
  name: string;
  firstSeen: number;
  images: CharacterImage[];
  appearances: number[];
  revealedAt: number;
  updates: [number, string][];
}

export interface CharacterImage {
  revealedAt: number;
  src: string;
  alt?: string;
  source?: string;
}

export type Connection = [string, string, number, string];

export interface KnowledgeEntry {
  name: string;
  kind: string;
  revealedAt: number;
}

export interface UniverseState {
  revealedAt: number;
  title: string;
  text: string;
}

export interface ProgressState {
  watched: number[];
  ratings: Record<number, number>;
  notes: Record<number, string>;
}

export interface Achievement {
  icon: string;
  name: string;
  desc: string;
  test: (watched: Set<number>) => boolean;
}

export type TabId =
  | "maratona"
  | "arquivo"
  | "conexoes"
  | "status"
  | "conquistas"
  | "ranking";

export type FilterId = "all" | "essential" | "recommended" | "unwatched" | "watched";
