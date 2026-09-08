import { RelationshipTargetType, RelationshipType, type CharacterRelationship } from "../types";

export const relationshipLabels: Record<RelationshipType, string> = {
  [RelationshipType.Ally]: "Aliado",
  [RelationshipType.Enemy]: "Inimigo",
  [RelationshipType.Member]: "Membro",
  [RelationshipType.Family]: "Família",
  [RelationshipType.Mentor]: "Mentor",
  [RelationshipType.Rival]: "Rival",
  [RelationshipType.Leader]: "Líder",
  [RelationshipType.Subordinate]: "Subordinado",
};

export const organizationLabels: Record<string, string> = {
  shield: "S.H.I.E.L.D.",
  avengers: "Vingadores",
  tva: "TVA",
  "kamar-taj": "Kamar-Taj",
};

export const characterRelationships: CharacterRelationship[] = [
  { characterId: "steve-rogers", revealedAt: 1, targetType: RelationshipTargetType.Character, targetId: "bucky-barnes", type: RelationshipType.Ally },
  { characterId: "bucky-barnes", revealedAt: 1, targetType: RelationshipTargetType.Character, targetId: "steve-rogers", type: RelationshipType.Ally },
  { characterId: "steve-rogers", revealedAt: 1, targetType: RelationshipTargetType.Organization, targetId: "shield", type: RelationshipType.Ally },
  { characterId: "tony-stark", revealedAt: 4, targetType: RelationshipTargetType.Organization, targetId: "shield", type: RelationshipType.Ally },
  { characterId: "thor", revealedAt: 5, targetType: RelationshipTargetType.Character, targetId: "loki", type: RelationshipType.Family },
  { characterId: "loki", revealedAt: 5, targetType: RelationshipTargetType.Character, targetId: "thor", type: RelationshipType.Family },
  { characterId: "steve-rogers", revealedAt: 6, targetType: RelationshipTargetType.Organization, targetId: "avengers", type: RelationshipType.Member },
  { characterId: "tony-stark", revealedAt: 6, targetType: RelationshipTargetType.Organization, targetId: "avengers", type: RelationshipType.Member },
  { characterId: "thor", revealedAt: 6, targetType: RelationshipTargetType.Organization, targetId: "avengers", type: RelationshipType.Member },
  { characterId: "natasha-romanoff", revealedAt: 6, targetType: RelationshipTargetType.Organization, targetId: "avengers", type: RelationshipType.Member },
  { characterId: "bruce-banner", revealedAt: 6, targetType: RelationshipTargetType.Organization, targetId: "avengers", type: RelationshipType.Member },
  { characterId: "steve-rogers", revealedAt: 8, targetType: RelationshipTargetType.Character, targetId: "sam-wilson", type: RelationshipType.Ally },
  { characterId: "sam-wilson", revealedAt: 8, targetType: RelationshipTargetType.Character, targetId: "steve-rogers", type: RelationshipType.Ally },
  { characterId: "steve-rogers", revealedAt: 8, targetType: RelationshipTargetType.Character, targetId: "bucky-barnes", type: RelationshipType.Enemy },
  { characterId: "bucky-barnes", revealedAt: 8, targetType: RelationshipTargetType.Character, targetId: "steve-rogers", type: RelationshipType.Enemy },
  { characterId: "tony-stark", revealedAt: 11, targetType: RelationshipTargetType.Character, targetId: "wanda-maximoff", type: RelationshipType.Enemy },
  { characterId: "wanda-maximoff", revealedAt: 11, targetType: RelationshipTargetType.Character, targetId: "tony-stark", type: RelationshipType.Enemy },
  { characterId: "tony-stark", revealedAt: 13, targetType: RelationshipTargetType.Character, targetId: "peter-parker", type: RelationshipType.Subordinate },
  { characterId: "peter-parker", revealedAt: 13, targetType: RelationshipTargetType.Character, targetId: "tony-stark", type: RelationshipType.Mentor },
  { characterId: "steve-rogers", revealedAt: 13, targetType: RelationshipTargetType.Character, targetId: "tony-stark", type: RelationshipType.Rival },
  { characterId: "tony-stark", revealedAt: 13, targetType: RelationshipTargetType.Character, targetId: "steve-rogers", type: RelationshipType.Rival },
  { characterId: "stephen-strange", revealedAt: 16, targetType: RelationshipTargetType.Organization, targetId: "kamar-taj", type: RelationshipType.Member },
  { characterId: "loki", revealedAt: 21, targetType: RelationshipTargetType.Organization, targetId: "tva", type: RelationshipType.Ally },
  { characterId: "peter-parker", revealedAt: 26, targetType: RelationshipTargetType.Character, targetId: "stephen-strange", type: RelationshipType.Ally },
  { characterId: "stephen-strange", revealedAt: 26, targetType: RelationshipTargetType.Character, targetId: "peter-parker", type: RelationshipType.Ally },
];
