import type { Character } from "../../types";
import { currentCharacterImage } from "../../selectors/characters";
import type { ProgressiveKnowledgeEngine } from "../../engines/progressiveKnowledge";

interface CharacterPortraitProps {
  character: Character;
  knowledge: ProgressiveKnowledgeEngine;
}

export function CharacterPortrait({ character, knowledge }: CharacterPortraitProps) {
  const image = currentCharacterImage(character, knowledge);

  if (!image || !image.src) {
    return (
      <div className="character-portrait asset-pending">
        <span>CLASSIFIED</span>
        <b>Retrato indisponível</b>
      </div>
    );
  }

  return <img className="character-portrait" src={image.src} alt={image.alt || character.name} />;
}
