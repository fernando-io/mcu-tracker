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
  firstAppearance: number;
  images: CharacterImage[];
  appearances: number[];
  updates: CharacterUpdate[];
}

export interface CharacterUpdate {
  revealedAt: number;
  text: string;
}

export interface CharacterImage {
  revealedAt: number;
  src: string;
  alt?: string;
  source?: string;
}

export enum RelationshipTargetType {
  Character = "Character",
  Organization = "Organization",
}

export enum RelationshipType {
  Ally = "ALLY",
  Enemy = "ENEMY",
  Member = "MEMBER",
  Family = "FAMILY",
  Mentor = "MENTOR",
  Rival = "RIVAL",
  Leader = "LEADER",
  Subordinate = "SUBORDINATE",
}

export interface CharacterRelationship {
  characterId: string;
  revealedAt: number;
  targetType: RelationshipTargetType;
  targetId: string;
  type: RelationshipType;
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

export type WatchlistProgress = Record<string, ProgressState>;

export type AchievementRule =
  | { type: "productions"; productionIds: number[] }
  | { type: "catalog"; priority?: Priority; releasedOnly?: boolean };

export interface Achievement {
  icon: string;
  name: string;
  desc: string;
  rule: AchievementRule;
}

export type TabId =
  | "maratona"
  | "arquivo"
  | "conexoes"
  | "status"
  | "conquistas"
  | "ranking";

export type FilterId = "all" | "essential" | "recommended" | "unwatched" | "watched";
