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

  return {
    watchedProductions,
    acquiredCount: watchedProductions.size,
    hasWatched,
    hasWatchedEvery,
    hasWatchedSome,
    canReveal,
    filterRevealed,
    latestRevealed,
  };
}
