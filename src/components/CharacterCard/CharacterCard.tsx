import { Link } from "react-router-dom";
import type { CharacterCardViewModel } from "../../viewModels/characters";
import { CharacterPortrait } from "../CharacterPortrait/CharacterPortrait";

interface CharacterCardProps {
  model: CharacterCardViewModel;
}

export function CharacterCard({ model }: CharacterCardProps) {
  return model.isUnlocked ? (
    <Link className="db-card character-card" to={`/character/${model.id}`}>
      <CharacterPortrait image={model.portrait} alt={model.name} />
      <div className="character-card-body">
        <h4>{model.name}</h4>
        <dl className="character-meta">
          <div><dt>Status conhecido</dt><dd>{model.status}</dd></div>
          <div><dt>Primeira aparição</dt><dd>{model.firstAppearanceTitle}</dd></div>
          <div><dt>Aparições vistas</dt><dd>{model.appearancesLabel}</dd></div>
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