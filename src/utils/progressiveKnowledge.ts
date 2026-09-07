import type { Character, CharacterImage, CharacterUpdate } from "../types";

export interface Revealable {
  revealedAt: number;
}

export interface ProgressiveKnowledgeEngine {
  watchedProductions: Set<number>;
  acquiredCount: number;
  hasWatched: (productionNumber: number) => boolean;
  hasWatchedEvery: (productionNumbers: number[]) => boolean;
  hasWatchedSome: (productionNumbers: number[]) => boolean;
  canReveal: (item: Revealable | number) => boolean;
  filterRevealed: <T extends Revealable>(items: T[]) => T[];
  latestRevealed: <T extends Revealable>(items: T[]) => T | undefined;
  hasEncounteredCharacter: (character: Pick<Character, "appearances">) => boolean;
  knownCharacterUpdates: (character: Pick<Character, "updates">) => CharacterUpdate[];
  currentCharacterStatus: (character: Pick<Character, "updates">) => string;
  currentCharacterImage: (character: Pick<Character, "images">) => CharacterImage | undefined;
  knownCharacterAppearances: (character: Pick<Character, "appearances">) => number[];
}

export function createProgressiveKnowledge(watched: Iterable<number>): ProgressiveKnowledgeEngine {
  const watchedProductions = new Set(watched);

  function hasWatched(productionNumber: number) {
    return watchedProductions.has(productionNumber);
  }

  function hasWatchedEvery(productionNumbers: number[]) {
    return productionNumbers.every(hasWatched);
  }

  function hasWatchedSome(productionNumbers: number[]) {
    return productionNumbers.some(hasWatched);
  }

  function canReveal(item: Revealable | number) {
    const revealedAt = typeof item === "number" ? item : item.revealedAt;
    return hasWatched(revealedAt);
  }

  function filterRevealed<T extends Revealable>(items: T[]) {
    return items.filter(item => canReveal(item));
  }

  function latestRevealed<T extends Revealable>(items: T[]) {
    return filterRevealed(items).sort((a, b) => b.revealedAt - a.revealedAt)[0];
  }

  function hasEncounteredCharacter(character: Pick<Character, "appearances">) {
    return hasWatchedSome(character.appearances);
  }

  function knownCharacterUpdates(character: Pick<Character, "updates">) {
    return filterRevealed(character.updates);
  }

  function currentCharacterStatus(character: Pick<Character, "updates">) {
    return latestRevealed(character.updates)?.text || "CLASSIFIED";
  }

  function currentCharacterImage(character: Pick<Character, "images">) {
    return latestRevealed(character.images);
  }

  function knownCharacterAppearances(character: Pick<Character, "appearances">) {
    return character.appearances.filter(hasWatched);
  }

  return {
    watchedProductions,
    acquiredCount: watchedProductions.size,
    hasWatched,
    hasWatchedEvery,
    hasWatchedSome,
    canReveal,
    filterRevealed,
    latestRevealed,
    hasEncounteredCharacter,
    knownCharacterUpdates,
    currentCharacterStatus,
    currentCharacterImage,
    knownCharacterAppearances,
  };
}

export function hasEncounteredCharacter(character: Character, knowledge: ProgressiveKnowledgeEngine) {
  return knowledge.hasEncounteredCharacter(character);
}

export function currentCharacterStatus(character: Character, knowledge: ProgressiveKnowledgeEngine) {
  return knowledge.currentCharacterStatus(character);
}

export function currentCharacterImage(character: Character, knowledge: ProgressiveKnowledgeEngine): CharacterImage | undefined {
  return knowledge.currentCharacterImage(character);
}

export function unlockedAppearances(character: Character, knowledge: ProgressiveKnowledgeEngine) {
  return knowledge.knownCharacterAppearances(character);
}
