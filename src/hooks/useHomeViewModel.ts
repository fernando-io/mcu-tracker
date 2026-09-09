import { useMemo } from "react";
import { achievements } from "../data/achievements";
import { connections, knowledge as knowledgeEntries, universeStates } from "../data/connections";
import { productions } from "../data/movies";
import { isAchievementUnlocked } from "../engines/achievementRules";
import type { FilterId } from "../types";
import { visible } from "../utils/mcu";
import { useCharacterCardModels } from "./useCharacterCardModels";
import { useProgressiveKnowledge } from "./useProgressiveKnowledge";
import { useWatchlistJourney } from "./useWatchlistJourney";

interface UseHomeViewModelOptions {
  filter: FilterId;
  query: string;
}

export function useHomeViewModel({ filter, query }: UseHomeViewModelOptions) {
  const journey = useWatchlistJourney();
  const progressiveKnowledge = useProgressiveKnowledge(journey.watched);
  const characterCardModels = useCharacterCardModels(progressiveKnowledge);
  const { activeWatchlist, progressState, watched } = journey;
  const watchlistProductions = useMemo(() => activeWatchlist.getProductions(), [activeWatchlist]);
  const released = useMemo(() => watchlistProductions.filter(movie => movie.p !== "future"), [watchlistProductions]);
  const seen = useMemo(() => released.filter(movie => watched.has(movie.n)).length, [released, watched]);
  const filteredSections = useMemo(() => [...new Set(watchlistProductions.map(movie => movie.s))]
    .map(name => ({
      name,
      movies: watchlistProductions.filter(movie => movie.s === name && visible(movie, query.trim().toLowerCase(), filter, watched)),
    }))
    .filter(section => section.movies.length), [filter, query, watched, watchlistProductions]);
  const ratedMovies = watchlistProductions
    .filter(movie => progressState.ratings[movie.n] > 0)
    .sort((a, b) => (progressState.ratings[b.n] - progressState.ratings[a.n]) || (a.n - b.n));

  return {
    ...journey,
    progressiveKnowledge,
    characterCardModels,
    hero: {
      pct: Math.round(seen / released.length * 100) || 0,
      seen,
      releasedTotal: released.length,
      acquiredKnowledgeCount: progressiveKnowledge.acquiredCount,
      essentialLeft: watchlistProductions.filter(movie => movie.p === "essential" && !watched.has(movie.n)).length,
      ratedCount: watchlistProductions.filter(movie => progressState.ratings[movie.n] > 0).length,
      futureCount: watchlistProductions.filter(movie => movie.p === "future").length,
    },
    filteredSections,
    watchlistProductions,
    knownKnowledge: knowledgeEntries.filter(entry => progressiveKnowledge.canReveal(entry)),
    futureKnowledge: knowledgeEntries.filter(entry => !progressiveKnowledge.canReveal(entry)).slice(0, 5),
    visibleConnections: connections.filter(connection => progressiveKnowledge.canReveal(connection[2])),
    latestUniverseStates: Object.values(Object.fromEntries(universeStates.filter(state => progressiveKnowledge.canReveal(state)).map(state => [state.title, state]))),
    achievements: achievements.map(achievement => ({
      achievement,
      unlocked: isAchievementUnlocked(achievement, progressiveKnowledge, productions),
    })),
    ratedMovies,
  };
}
