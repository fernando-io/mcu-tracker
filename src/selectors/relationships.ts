import type { Character, CharacterRelationship } from "../types";
import { characterRelationships } from "../data/characterRelationships";
import type { ProgressiveKnowledgeEngine } from "../engines/progressiveKnowledge";

export function knownCharacterRelationships(character: Character, knowledge: ProgressiveKnowledgeEngine): CharacterRelationship[] {
  const latestByTarget = new Map<string, CharacterRelationship>();

  characterRelationships
    .filter(relationship => relationship.characterId === character.id && knowledge.canReveal(relationship))
    .forEach(relationship => {
      const key = `${relationship.targetType}:${relationship.targetId}`;
      const current = latestByTarget.get(key);

      if (!current || relationship.revealedAt > current.revealedAt) {
        latestByTarget.set(key, relationship);
      }
    });

  return [...latestByTarget.values()].sort((a, b) => a.revealedAt - b.revealedAt);
}
