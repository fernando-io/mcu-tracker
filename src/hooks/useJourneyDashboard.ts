import { useMemo } from "react";
import { achievements } from "../data/achievements";
import { characters } from "../data/characters";
import { knowledge as knowledgeEntries } from "../data/connections";
import { isAchievementUnlocked } from "../engines/achievementRules";
import { createProgressiveKnowledge } from "../engines/progressiveKnowledge";
import { hasEncounteredCharacter } from "../selectors/characters";
import { knownCharacterRelationships } from "../selectors/relationships";
import type { ProgressiveKnowledgeEngine } from "../engines/progressiveKnowledge";
import type { JourneyDashboardViewModel } from "../viewModels/journeyDashboard";
import { useHomeViewModel } from "./useHomeViewModel";

function countKnownRelationships(knowledge: ProgressiveKnowledgeEngine): number {
  return characters
    .filter(character => hasEncounteredCharacter(character, knowledge))
    .reduce((total, character) => total + knownCharacterRelationships(character, knowledge).length, 0);
}

export function useJourneyDashboard(): JourneyDashboardViewModel {
  const home = useHomeViewModel({ filter: "all", query: "" });
  const { activeWatchlist, progressiveKnowledge, watched } = home;
  const journeyKnowledge = useMemo(
    () => createProgressiveKnowledge(activeWatchlist.getProductionIds()),
    [activeWatchlist],
  );
  const journeyProductions = activeWatchlist.getProductions();
  const progress = activeWatchlist.getProgressSummary();
  const nextProduction = journeyProductions.find(production => !watched.has(production.n));
  const knownCharacters = home.characterCardModels.filter(character => character.isUnlocked).length;
  const journeyCharacterCount = characters.filter(character => hasEncounteredCharacter(character, journeyKnowledge)).length;
  const knownRelationships = countKnownRelationships(progressiveKnowledge);
  const journeyRelationshipCount = countKnownRelationships(journeyKnowledge);
  const knownKnowledgeCount = home.knownKnowledge.length;
  const journeyKnowledgeCount = knowledgeEntries.filter(entry => journeyKnowledge.canReveal(entry)).length;
  const totalDatabaseEntries = journeyCharacterCount + journeyRelationshipCount + journeyKnowledgeCount;
  const knownDatabaseEntries = knownCharacters + knownRelationships + knownKnowledgeCount;
  const organizationAndConceptEntries = knowledgeEntries.filter(entry => (
    entry.kind === "organização" || entry.kind === "conceito"
  ));
  const knownOrganizationsAndConcepts = home.knownKnowledge.filter(entry => (
    entry.kind === "organização" || entry.kind === "conceito"
  )).length;
  const journeyOrganizationsAndConceptsCount = organizationAndConceptEntries.filter(entry => (
    journeyKnowledge.canReveal(entry)
  )).length;

  return {
    journey: {
      name: activeWatchlist.watchlist.name,
      description: activeWatchlist.watchlist.description,
      kindLabel: activeWatchlist.watchlist.kind === "official" ? "Oficial" : "Personalizada",
      productionCount: progress.totalProductions,
    },
    continueWatching: nextProduction ? {
      title: nextProduction.t,
      type: nextProduction.type,
      position: activeWatchlist.getProductionPosition(nextProduction.n) || 0,
    } : undefined,
    progress: {
      completed: progress.completedProductions,
      total: progress.totalProductions,
      percentage: progress.completionPercentage,
    },
    database: {
      knownCharacters,
      totalCharacters: journeyCharacterCount,
      charactersPercentage: journeyCharacterCount
        ? Math.round((knownCharacters / journeyCharacterCount) * 100)
        : 0,
      knownRelationships,
      totalRelationships: journeyRelationshipCount,
      relationshipsPercentage: journeyRelationshipCount
        ? Math.round((knownRelationships / journeyRelationshipCount) * 100)
        : 0,
      knownOrganizationsAndConcepts,
      totalOrganizationsAndConcepts: journeyOrganizationsAndConceptsCount,
      organizationsAndConceptsPercentage: journeyOrganizationsAndConceptsCount
        ? Math.round((knownOrganizationsAndConcepts / journeyOrganizationsAndConceptsCount) * 100)
        : 0,
      percentage: totalDatabaseEntries
        ? Math.round((knownDatabaseEntries / totalDatabaseEntries) * 100)
        : 0,
    },
    characters: {
      known: knownCharacters,
      hidden: Math.max(journeyCharacterCount - knownCharacters, 0),
    },
    statistics: {
      essentialRemaining: home.hero.essentialLeft,
      productionsRemaining: progress.remainingProductions,
      ratedProductions: home.ratedMovies.length,
      unlockedAchievements: achievements.filter(achievement => (
        isAchievementUnlocked(achievement, progressiveKnowledge, journeyProductions)
      )).length,
    },
  };
}


