import { Link, useParams } from "react-router-dom";
import { characters } from "../../data/characters";
import { connections } from "../../data/connections";
import { productions } from "../../data/movies";
import { CharacterPortrait } from "../../components/CharacterPortrait/CharacterPortrait";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { currentStatus } from "../../utils/mcu";
import { level } from "../../utils/mcu";
import { unlockedAppearances } from "../../utils/characters";

export function CharacterPage() {
  const { id } = useParams();
  const [state] = useLocalStorage();
  const watched = new Set(state.watched || []);
  const knowledgeLevel = level(watched);
  const character = characters.find(item => item.id === id);

  if (!character || character.revealedAt > knowledgeLevel) {
    return (
      <main className="wrap character-page">
        <Link className="back-link" to="/?tab=arquivo">Voltar para Database</Link>
        <div className="empty">Arquivo classificado ou inexistente.</div>
      </main>
    );
  }

  const firstSeen = productions.find(movie => movie.n === character.firstSeen);
  const appearances = unlockedAppearances(character, knowledgeLevel)
    .map(number => productions.find(movie => movie.n === number))
    .filter(Boolean);
  const relationships = connections.filter(connection =>
    connection[2] <= knowledgeLevel && (connection[0] === character.name || connection[1] === character.name)
  );

  return (
    <main className="wrap character-page">
      <Link className="back-link" to="/?tab=arquivo">Voltar para Database</Link>
      <section className="card character-profile">
        <CharacterPortrait character={character} knowledgeLevel={knowledgeLevel} />
        <div className="character-profile-copy">
          <div className="eyebrow">S.H.I.E.L.D. file</div>
          <h1>{character.name}</h1>
          <p>{currentStatus(character, knowledgeLevel)}</p>
          <dl className="character-detail-meta">
            <div><dt>Primeira aparição conhecida</dt><dd>{firstSeen?.t || "CLASSIFIED"}</dd></div>
            <div><dt>Aparições já vistas</dt><dd>{appearances.length}</dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div className="section-title"><h2>Descrição conhecida</h2><p>Último status desbloqueado pelo seu progresso.</p></div></div>
        <div className="where"><p>{currentStatus(character, knowledgeLevel)}</p></div>
      </section>

      <section className="section">
        <div className="section-head"><div className="section-title"><h2>Aparições</h2><p>Somente produções já liberadas pela sua maratona.</p></div></div>
        <div className="where-list">
          {appearances.map(movie => movie ? <div key={movie.n} className="where"><h4>{movie.t}</h4><p>{movie.type}</p></div> : null)}
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div className="section-title"><h2>Relacionamentos</h2><p>Conexões já reveladas.</p></div></div>
        <div className="where-list">
          {relationships.length ? relationships.map(([a, b, at, relation], index) => (
            <div key={`${a}-${b}-${at}-${index}`} className="where"><h4>{a === character.name ? b : a}</h4><p>{relation}</p></div>
          )) : <div className="empty">Nenhum relacionamento desbloqueado.</div>}
        </div>
      </section>
    </main>
  );
}
