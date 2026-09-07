import type { Character } from "../../types";
import { currentCharacterImage } from "../../utils/characters";

interface CharacterPortraitProps {
  character: Character;
  knowledgeLevel: number;
}

export function CharacterPortrait({ character, knowledgeLevel }: CharacterPortraitProps) {
  const image = currentCharacterImage(character, knowledgeLevel);

  if (!image || !image.src) {
    return (
      <div className="character-portrait asset-pending">
        <span>CLASSIFIED</span>
        <b>Portrait unavailable</b>
      </div>
    );
  }

  return <img className="character-portrait" src={image.src} alt={image.alt || character.name} />;
}
