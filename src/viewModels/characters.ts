import type { CharacterImage, Movie } from "../types";

export interface LockedCharacterCardViewModel {
  isUnlocked: false;
}

export interface KnownCharacterCardViewModel {
  isUnlocked: true;
  id: string;
  name: string;
  portrait: CharacterImage | undefined;
  status: string;
  firstAppearanceTitle: string;
  appearancesLabel: string;
}

export type CharacterCardViewModel = LockedCharacterCardViewModel | KnownCharacterCardViewModel;

export interface RelationshipRecordViewModel {
  id: string;
  targetName: string;
  relationshipLabel: string;
}

export interface CharacterDossierViewModel {
  id: string;
  name: string;
  portrait: CharacterImage | undefined;
  status: string;
  firstAppearanceTitle: string;
  appearancesLabel: string;
  appearances: Movie[];
  relationships: RelationshipRecordViewModel[];
}