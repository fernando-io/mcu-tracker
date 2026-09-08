import { Link, useParams } from "react-router-dom";
import { AppearanceCard } from "../../components/AppearanceCard/AppearanceCard";
import { CharacterPortrait } from "../../components/CharacterPortrait/CharacterPortrait";
import { RelationshipRecord } from "../../components/RelationshipRecord/RelationshipRecord";
import { characters } from "../../data/characters";
import { productions } from "../../data/movies";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Movie } from "../../types";
import { currentCharacterStatus, hasEncounteredCharacter, unlockedAppearances } from "../../selectors/characters";
import { createProgressiveKnowledge } from "../../engines/progressiveKnowledge";
import { knownCharacterRelationships } from "../../selectors/relationships";

export function CharacterPage() {
  const { id } = useParams();
  const [state] = useLocalStorage();
  const watched = new Set(state.watched || []);
  const knowledge = createProgressiveKnowledge(watched);
  const character = characters.find(item => item.id === id);

  if (!character || !hasEncounteredCharacter(character, knowledge)) {
    return (
      <main className="wrap character-page">
        <Link className="back-link" to="/?tab=arquivo">Voltar para Database</Link>
        <div className="empty">Arquivo classificado ou inexistente.</div>
      </main>
    );
  }

  const status = currentCharacterStatus(character, knowledge);
  const firstSeen = productions.find(movie => movie.n === character.firstAppearance);
  const appearances = unlockedAppearances(character, knowledge)
    .map(number => productions.find(movie => movie.n === number))
    .filter((movie): movie is Movie => Boolean(movie));
  const relationships = knownCharacterRelationships(character, knowledge);
  const appearancesLabel = `${appearances.length} ${appearances.length === 1 ? "aparição conhecida" : "aparições conhecidas"}`;

  return (
    <main className="wrap character-page dossier-page">
      <Link className="back-link dossier-back" to="/?tab=arquivo">Voltar para Database</Link>

      <section className="card character-profile dossier-hero">
        <div className="dossier-portrait-frame">
          <CharacterPortrait character={character} knowledge={knowledge} />
        </div>
        <div className="character-profile-copy dossier-identity">
          <div className="dossier-classification">
            <span>Dossiê S.H.I.E.L.D.</span>
            <b>REGISTRO INTERNO</b>
          </div>
          <h1>{character.name}</h1>
          <div className="dossier-status-block">
            <span>Status conhecido</span>
            <p>{status}</p>
          </div>
          <dl className="character-detail-meta dossier-meta-grid">
            <div><dt>Primeira aparição</dt><dd>{firstSeen?.t || "CLASSIFIED"}</dd></div>
            <div><dt>Histórico confirmado</dt><dd>{appearancesLabel}</dd></div>
          </dl>
        </div>
      </section>

      <section className="section dossier-section">
        <div className="section-head"><div className="section-title"><h2>Relatório de inteligência</h2><p>Último registro conhecido desbloqueado pelo seu progresso.</p></div></div>
        <article className="intelligence-report">
          <div className="report-stamp">Inteligência verificada</div>
          <p>{status}</p>
        </article>
      </section>

      <section className="section dossier-section">
        <div className="section-head"><div className="section-title"><h2>Histórico conhecido</h2><p>Produções confirmadas dentro da sua maratona.</p></div></div>
        <div className="dossier-record-list">
          {appearances.map(movie => <AppearanceCard key={movie.n} production={movie} />)}
        </div>
      </section>

      <section className="section dossier-section">
        <div className="section-head"><div className="section-title"><h2>Relacionamentos</h2><p>Conexões já reveladas.</p></div></div>
        <div className="dossier-record-list relationships-list">
          {relationships.length ? relationships.map(relationship => (
            <RelationshipRecord key={`${relationship.characterId}-${relationship.targetType}-${relationship.targetId}-${relationship.revealedAt}-${relationship.type}`} relationship={relationship} />
          )) : <div className="empty">Nenhum relacionamento desbloqueado.</div>}
        </div>
      </section>
    </main>
  );
}
