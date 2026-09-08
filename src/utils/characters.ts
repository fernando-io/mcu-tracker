import type { Character, CharacterImage } from "../types";
import type { ProgressiveKnowledgeEngine } from "./progressiveKnowledge";

export function hasEncounteredCharacter(character: Character, knowledge: ProgressiveKnowledgeEngine) {
  return knowledge.hasWatchedSome(character.appearances);
}

export function currentCharacterStatus(character: Character, knowledge: ProgressiveKnowledgeEngine) {
  return knowledge.latestRevealed(character.updates)?.text || "CLASSIFIED";
}

export function currentCharacterImage(character: Character, knowledge: ProgressiveKnowledgeEngine): CharacterImage | undefined {
  return knowledge
    .filterRevealed(character.images)
    .filter(image => image.src)
    .sort((a, b) => b.revealedAt - a.revealedAt)[0];
}

export function unlockedAppearances(character: Character, knowledge: ProgressiveKnowledgeEngine) {
  return character.appearances.filter(appearance => knowledge.hasWatched(appearance));
}
