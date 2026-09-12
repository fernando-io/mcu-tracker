export interface JourneyDashboardViewModel {
  journey: {
    name: string;
    description: string;
    kindLabel: string;
    productionCount: number;
  };
  continueWatching: {
    title: string;
    type: string;
    position: number;
  } | undefined;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  database: {
    knownCharacters: number;
    totalCharacters: number;
    charactersPercentage: number;
    knownRelationships: number;
    totalRelationships: number;
    relationshipsPercentage: number;
    knownOrganizationsAndConcepts: number;
    totalOrganizationsAndConcepts: number;
    organizationsAndConceptsPercentage: number;
    percentage: number;
  };
  characters: {
    known: number;
    hidden: number;
  };
  statistics: {
    essentialRemaining: number;
    productionsRemaining: number;
    ratedProductions: number;
    unlockedAchievements: number;
  };
}
