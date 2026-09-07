import type { Character } from "../types";

export function currentCharacterImage(character: Character, knowledgeLevel: number) {
  return character.images
    .filter(image => image.revealedAt <= knowledgeLevel)
    .sort((a, b) => b.revealedAt - a.revealedAt)[0];
}

export function unlockedAppearances(character: Character, knowledgeLevel: number) {
  return character.appearances.filter(appearance => appearance <= knowledgeLevel);
}
