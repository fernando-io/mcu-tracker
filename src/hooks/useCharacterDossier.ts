import { useMemo } from "react";
import { characterRelationships, organizationLabels, relationshipLabels } from "../data/characterRelationships";
import { characters } from "../data/characters";
import { productions } from "../data/movies";
import { RelationshipTargetType, type Movie } from "../types";
import {
  currentCharacterImage,
  currentCharacterStatus,
  hasEncounteredCharacter,
  unlockedAppearances,
} from "../selectors/characters";
import { knownCharacterRelationships } from "../selectors/relationships";
import type { CharacterDossierViewModel, RelationshipRecordViewModel } from "../viewModels/characters";
import { useProgressiveKnowledge } from "./useProgressiveKnowledge";

function getRelationshipTargetName(targetType: RelationshipTargetType, targetId: string): string {
  if (targetType === RelationshipTargetType.Organization) {
    return organizationLabels[targetId] || targetId;
  }

  return characters.find(character => character.id === targetId)?.name || targetId;
}

function toRelationshipRecordViewModel(
  relationship: (typeof characterRelationships)[number],
): RelationshipRecordViewModel {
  return {
    id: `${relationship.characterId}-${relationship.targetType}-${relationship.targetId}-${relationship.revealedAt}-${relationship.type}`,
    targetName: getRelationshipTargetName(relationship.targetType, relationship.targetId),
    relationshipLabel: relationshipLabels[relationship.type],
  };
}

export function useCharacterDossier(
  characterId: string | undefined,
  watched: Iterable<number>,
): CharacterDossierViewModel | undefined {
  const knowledge = useProgressiveKnowledge(watched);

  return useMemo(() => {
    const character = characters.find(item => item.id === characterId);

    if (!character || !hasEncounteredCharacter(character, knowledge)) {
      return undefined;
    }

    const appearances = unlockedAppearances(character, knowledge)
      .map(number => productions.find(movie => movie.n === number))
      .filter((movie): movie is Movie => Boolean(movie));
    const firstAppearanceTitle = productions.find(movie => movie.n === character.firstAppearance)?.t || "CLASSIFIED";

    return {
      id: character.id,
      name: character.name,
      portrait: currentCharacterImage(character, knowledge),
      status: currentCharacterStatus(character, knowledge),
      firstAppearanceTitle,
      appearancesLabel: `${appearances.length} ${appearances.length === 1 ? "aparição conhecida" : "aparições conhecidas"}`,
      appearances,
      relationships: knownCharacterRelationships(character, knowledge).map(toRelationshipRecordViewModel),
    };
  }, [characterId, knowledge]);
}