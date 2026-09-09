import { useMemo } from "react";
import { characters } from "../data/characters";
import { productions } from "../data/movies";
import type { ProgressiveKnowledgeEngine } from "../engines/progressiveKnowledge";
import {
  currentCharacterImage,
  currentCharacterStatus,
  hasEncounteredCharacter,
  unlockedAppearances,
} from "../selectors/characters";
import type { CharacterCardViewModel } from "../viewModels/characters";

export function useCharacterCardModels(knowledge: ProgressiveKnowledgeEngine): CharacterCardViewModel[] {
  return useMemo(
    () => characters.map(character => {
      if (!hasEncounteredCharacter(character, knowledge)) {
        return { isUnlocked: false };
      }

      const appearances = unlockedAppearances(character, knowledge);
      const firstAppearanceTitle = productions.find(movie => movie.n === character.firstAppearance)?.t || "CLASSIFIED";

      return {
        isUnlocked: true,
        id: character.id,
        name: character.name,
        portrait: currentCharacterImage(character, knowledge),
        status: currentCharacterStatus(character, knowledge),
        firstAppearanceTitle,
        appearancesLabel: `${appearances.length} ${appearances.length === 1 ? "aparição conhecida" : "aparições conhecidas"}`,
      };
    }),
    [knowledge],
  );
}