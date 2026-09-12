import { achievements } from "../data/achievements";
import { characters } from "../data/characters";
import { connections, knowledge, universeStates } from "../data/connections";
import { productions } from "../data/movies";
import { isAchievementUnlocked } from "../engines/achievementRules";
import { createProgressiveKnowledge } from "../engines/progressiveKnowledge";
import { hasEncounteredCharacter } from "../selectors/characters";

export type UnlockCategory = string;

export interface UnlockItem {
  id: string;
  label: string;
}

export interface UnlockGroup {
  id: UnlockCategory;
  title: string;
  items: UnlockItem[];
}

function newlyRevealed<T>(items: readonly T[], wasRevealed: (item: T) => boolean, isRevealed: (item: T) => boolean) {
  return items.filter(item => !wasRevealed(item) && isRevealed(item));
}

export function collectUnlockGroups(previousWatched: Iterable<number>, nextWatched: Iterable<number>): UnlockGroup[] {
  const previousKnowledge = createProgressiveKnowledge(previousWatched);
  const nextKnowledge = createProgressiveKnowledge(nextWatched);

  const newCharacters = newlyRevealed(
    characters,
    character => hasEncounteredCharacter(character, previousKnowledge),
    character => hasEncounteredCharacter(character, nextKnowledge),
  ).map(character => ({ id: character.id, label: character.name }));

  const newRelationships = newlyRevealed(
    connections,
    connection => previousKnowledge.canReveal(connection[2]),
    connection => nextKnowledge.canReveal(connection[2]),
  ).map(([source, target, revealedAt]) => ({ id: `${source}-${target}-${revealedAt}`, label: `${source} ↔ ${target}` }));

  const newKnowledge = newlyRevealed(
    knowledge,
    entry => previousKnowledge.canReveal(entry),
    entry => nextKnowledge.canReveal(entry),
  ).map(entry => ({ id: entry.name, label: entry.name }));

  const newEvents = newlyRevealed(
    universeStates,
    event => previousKnowledge.canReveal(event),
    event => nextKnowledge.canReveal(event),
  ).map(event => ({ id: `${event.title}-${event.revealedAt}`, label: event.title }));

  const newAchievements = newlyRevealed(
    achievements,
    achievement => isAchievementUnlocked(achievement, previousKnowledge, productions),
    achievement => isAchievementUnlocked(achievement, nextKnowledge, productions),
  ).map(achievement => ({ id: achievement.name, label: achievement.name }));

  const groups: UnlockGroup[] = [
    { id: "characters", title: "Novos personagens", items: newCharacters },
    { id: "relationships", title: "Novas relações", items: newRelationships },
    { id: "knowledge", title: "Novos registros", items: newKnowledge },
    { id: "events", title: "Novos eventos", items: newEvents },
    { id: "achievements", title: "Novas conquistas", items: newAchievements },
  ];

  return groups.filter(group => group.items.length);
}