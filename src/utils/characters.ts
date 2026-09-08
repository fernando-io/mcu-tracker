import type { Character, CharacterImage } from "../types";
import {
  hasEncounteredCharacter,
  unlockedAppearances,
  type ProgressiveKnowledgeEngine,
} from "./progressiveKnowledge";

export function currentCharacterImage(character: Character, knowledge: ProgressiveKnowledgeEngine): CharacterImage | undefined {
  return knowledge
    .filterRevealed(character.images)
    .filter(image => image.src)
    .sort((a, b) => b.revealedAt - a.revealedAt)[0];
}

export {
  hasEncounteredCharacter,
  unlockedAppearances,
};
