import { Link } from "react-router-dom";
import type { Character } from "../../types";
import { currentStatus } from "../../utils/mcu";
import { unlockedAppearances } from "../../utils/characters";
import { productions } from "../../data/movies";
import { CharacterPortrait } from "../CharacterPortrait/CharacterPortrait";

interface CharacterCardProps {
  character: Character;
  knowledgeLevel: number;
}

export function CharacterCard({ character, knowledgeLevel }: CharacterCardProps) {
  const unlocked = character.revealedAt <= knowledgeLevel;
  const firstSeen = productions.find(movie => movie.n === character.firstSeen);
  const appearances = unlockedAppearances(character, knowledgeLevel);
  const appearancesLabel = `${appearances.length} ${appearances.length === 1 ? "aparição conhecida" : "aparições conhecidas"}`;

  return unlocked ? (
    <Link className="db-card character-card" to={`/character/${character.id}`}>
      <CharacterPortrait character={character} knowledgeLevel={knowledgeLevel} />
      <div className="character-card-body">
        <h4>{character.name}</h4>
        <dl className="character-meta">
          <div><dt>Status conhecido</dt><dd>{currentStatus(character, knowledgeLevel)}</dd></div>
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
