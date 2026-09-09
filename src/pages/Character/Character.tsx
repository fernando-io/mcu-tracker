import { Link, useParams } from "react-router-dom";
import { AppearanceCard } from "../../components/AppearanceCard/AppearanceCard";
import { CharacterPortrait } from "../../components/CharacterPortrait/CharacterPortrait";
import { RelationshipRecord } from "../../components/RelationshipRecord/RelationshipRecord";
import { useCharacterDossier } from "../../hooks/useCharacterDossier";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function CharacterPage() {
  const { id } = useParams();
  const [state] = useLocalStorage();
  const dossier = useCharacterDossier(id, state.watched || []);

  if (!dossier) {
    return (
      <main className="wrap character-page">
        <Link className="back-link" to="/?tab=arquivo">Voltar para Database</Link>
        <div className="empty">Arquivo classificado ou inexistente.</div>
      </main>
    );
  }

  return (
    <main className="wrap character-page dossier-page">
      <Link className="back-link dossier-back" to="/?tab=arquivo">Voltar para Database</Link>

      <section className="card character-profile dossier-hero">
        <div className="dossier-portrait-frame">
          <CharacterPortrait image={dossier.portrait} alt={dossier.name} />
        </div>
        <div className="character-profile-copy dossier-identity">
          <div className="dossier-classification">
            <span>Dossiê S.H.I.E.L.D.</span>
            <b>REGISTRO INTERNO</b>
          </div>
          <h1>{dossier.name}</h1>
          <div className="dossier-status-block">
            <span>Status conhecido</span>
            <p>{dossier.status}</p>
          </div>
          <dl className="character-detail-meta dossier-meta-grid">
            <div><dt>Primeira aparição</dt><dd>{dossier.firstAppearanceTitle}</dd></div>
            <div><dt>Histórico confirmado</dt><dd>{dossier.appearancesLabel}</dd></div>
          </dl>
        </div>
      </section>

      <section className="section dossier-section">
        <div className="section-head"><div className="section-title"><h2>Relatório de inteligência</h2><p>Último registro conhecido desbloqueado pelo seu progresso.</p></div></div>
        <article className="intelligence-report">
          <div className="report-stamp">Inteligência verificada</div>
          <p>{dossier.status}</p>
        </article>
      </section>

      <section className="section dossier-section">
        <div className="section-head"><div className="section-title"><h2>Histórico conhecido</h2><p>Produções confirmadas dentro da sua maratona.</p></div></div>
        <div className="dossier-record-list">
          {dossier.appearances.map(movie => <AppearanceCard key={movie.n} production={movie} />)}
        </div>
      </section>

      <section className="section dossier-section">
        <div className="section-head"><div className="section-title"><h2>Relacionamentos</h2><p>Conexões já reveladas.</p></div></div>
        <div className="dossier-record-list relationships-list">
          {dossier.relationships.length ? dossier.relationships.map(relationship => (
            <RelationshipRecord key={relationship.id} model={relationship} />
          )) : <div className="empty">Nenhum relacionamento desbloqueado.</div>}
        </div>
      </section>
    </main>
  );
}