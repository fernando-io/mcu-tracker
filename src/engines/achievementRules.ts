import type { Achievement, Movie } from "../types";
import type { ProgressiveKnowledgeEngine } from "./progressiveKnowledge";

export function isAchievementUnlocked(
  achievement: Achievement,
  knowledge: ProgressiveKnowledgeEngine,
  productionCatalog: readonly Movie[],
): boolean {
  const { rule } = achievement;

  if (rule.type === "productions") {
    return knowledge.hasWatchedEvery(rule.productionIds);
  }

  return productionCatalog
    .filter(production => (!rule.priority || production.p === rule.priority) && (!rule.releasedOnly || production.p !== "future"))
    .every(production => knowledge.hasWatched(production.n));
}