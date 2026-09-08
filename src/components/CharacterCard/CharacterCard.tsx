import { Link } from "react-router-dom";
import type { Character } from "../../types";
import { currentCharacterStatus, hasEncounteredCharacter, unlockedAppearances } from "../../selectors/characters";
import type { ProgressiveKnowledgeEngine } from "../../engines/progressiveKnowledge";
import { productions } from "../../data/movies";
import { CharacterPortrait } from "../CharacterPortrait/CharacterPortrait";

interface CharacterCardProps {
  character: Character;
  knowledge: ProgressiveKnowledgeEngine;
}

export function CharacterCard({ character, knowledge }: CharacterCardProps) {
  const unlocked = hasEncounteredCharacter(character, knowledge);
  const firstSeen = productions.find(movie => movie.n === character.firstAppearance);
  const appearances = unlockedAppearances(character, knowledge);
  const appearancesLabel = `${appearances.length} ${appearances.length === 1 ? "aparição conhecida" : "aparições conhecidas"}`;

  return unlocked ? (
    <Link className="db-card character-card" to={`/character/${character.id}`}>
      <CharacterPortrait character={character} knowledge={knowledge} />
      <div className="character-card-body">
        <h4>{character.name}</h4>
        <dl className="character-meta">
          <div><dt>Status conhecido</dt><dd>{currentCharacterStatus(character, knowledge)}</dd></div>
          <div><dt>Primeira aparição</dt><dd>{firstSeen?.t || "CLASSIFIED"}</dd></div>
          <div><dt>Aparições vistas</dt><dd>{appearancesLabel}</dd></div>
        </dl>
      </div>
    </Link>
  ) : (
    <div className="db-card character-card locked">
      <div className="character-portrait classified">████████</div>
      <div className="character-card-body">
        <h4>████████</h4>
        <dl className="character-meta">
          <div><dt>Status conhecido</dt><dd><span className="classified">ACCESS DENIED</span></dd></div>
        </dl>
      </div>
    </div>
  );
}
