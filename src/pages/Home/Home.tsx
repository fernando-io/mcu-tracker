import { ChartColumn, CircleCheck, Clock3, Database, EyeOff, FileText, Film, Landmark, MapPin, Share2, Star, Trophy, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ironmanHero from "../../assets/ironman3.jpg";
import ironmanPoster from "../../assets/ironman.jpg";
import ironmanContinue from "../../assets/ironman2.jpg";
import { useJourneyDashboard } from "../../hooks/useJourneyDashboard";

export function Home() {
const dashboard = useJourneyDashboard();
  const indexedDatabaseRecords = dashboard.database.knownCharacters
    + dashboard.database.knownRelationships
    + dashboard.database.knownOrganizationsAndConcepts;
  const getDatabaseDistribution = (count: number) => indexedDatabaseRecords
    ? Math.round((count / indexedDatabaseRecords) * 100)
    : 0;return (
    <main className="wrap page-content dashboard-page">
      <section className="dashboard-hero" aria-labelledby="dashboard-title">
        <div className="dashboard-hero-copy">
          <span className="eyebrow">Jornada ativa</span>
          <h1 id="dashboard-title">{dashboard.journey.name}</h1>
          <p>{dashboard.journey.description}</p>
          <div className="dashboard-hero-meta">
            <span className={`watchlist-kind ${dashboard.journey.kindLabel === "Personalizada" ? "custom" : "official"}`}>
              {dashboard.journey.kindLabel}
            </span>
            <span><b>{dashboard.journey.productionCount}</b> produções</span>
            <span><b>{dashboard.statistics.essentialRemaining}</b> essenciais restantes</span>
            <span className="journey-epic"><i aria-hidden="true">∞</i> Uma jornada épica</span>
          </div>
          <blockquote className="dashboard-hero-quote">
            <p>"Tudo está conectado."</p>
            <cite>Nick Fury</cite>
          </blockquote>
        </div>
        <div className="dashboard-hero-visual" aria-hidden="true">
          <img className="dashboard-hero-image" src={ironmanHero} alt="" />
          <div className="hero-visual-grid" />
          <div className="hero-visual-core"><span>MCU</span><b>JORNADA</b></div>
          <div className="hero-visual-scan" />
          <div className="hero-visual-caption"><span>MAIS DO QUE FILMES.</span><strong>UMA JORNADA.</strong></div>
        </div>
      </section>

      <section className="dashboard-grid dashboard-primary" aria-label="Resumo da jornada">
        <article className="dashboard-card continue-card">
          <div className="continue-card-head">
            <span className="continue-label"><i aria-hidden="true">▶</i> Continuar assistindo</span>
            {dashboard.continueWatching && <span className="continue-position">{String(dashboard.continueWatching.position).padStart(2, "0")}</span>}
          </div>
          {dashboard.continueWatching ? (
            <div className="continue-layout">
              <div className="continue-visual" aria-hidden="true">
                <img className="continue-image" src={ironmanPoster} alt="" />
                <span>PRÓXIMO</span>
                <b>{String(dashboard.continueWatching.position).padStart(2, "0")}</b>
                <i />
              </div>
              <div className="continue-card-content">
                <p className="continue-overline">Próximo capítulo</p>
                <h2>{dashboard.continueWatching.title}</h2>
                <p className="continue-type">{dashboard.continueWatching.type} <span>•</span> Produção {String(dashboard.continueWatching.position).padStart(2, "0")}</p>
                <p className="continue-summary">O próximo registro confirmado da sua jornada.</p>
                <Link className="continue-cta" to="/timeline"><span>Continuar jornada</span><b aria-hidden="true">→</b></Link>
              </div>
            </div>
          ) : (
            <div className="continue-card-content continue-complete">
              <p className="continue-overline">Protocolo concluído</p>
              <h2>Jornada concluída</h2>
              <p className="continue-type">Todas as produções desta jornada foram marcadas como assistidas.</p>
            </div>
          )}
        </article>

        <article className="dashboard-card progress-card">
          <span className="progress-label"><ChartColumn aria-hidden="true" size={18} strokeWidth={1.8} /> Progresso da jornada</span>
          <div className="dashboard-progress-value">
            <strong>{dashboard.progress.percentage}%</strong>
            <div><b>{dashboard.progress.completed} de {dashboard.progress.total}</b><span>produções assistidas</span></div>
          </div>
          <div className="dashboard-progress-bar"><span style={{ width: `${dashboard.progress.percentage}%` }} /></div>
          <div className="progress-detail-grid">
            <span><CircleCheck aria-hidden="true" size={18} strokeWidth={1.8} /><b>{dashboard.progress.completed}</b> Assistidas</span>
            <span><Clock3 aria-hidden="true" size={18} strokeWidth={1.8} /><b>{dashboard.statistics.productionsRemaining}</b> Restantes</span>
            <span><Star aria-hidden="true" size={18} strokeWidth={1.8} /><b>{dashboard.statistics.essentialRemaining}</b> Essenciais</span>
          </div>
        </article>
      </section>

      <section className="dashboard-database" aria-labelledby="database-progress-title">
        <div className="dashboard-section-head">
          <div>
            <span className="eyebrow">S.H.I.E.L.D. Database</span>
            <h2 id="database-progress-title">Progresso da Database</h2>
            <p>Conhecimento desbloqueado a cada produção assistida.</p>
          </div>
          <div className="database-total"><div><strong>{indexedDatabaseRecords}</strong><span>registros indexados</span></div><Database aria-hidden="true" size={36} strokeWidth={1.7} /></div>
        </div>
        <div className="dashboard-grid dashboard-metrics">
          <article className="database-metric">
            <div className="database-metric-info">
              <Users className="metric-glyph" aria-hidden="true" size={24} strokeWidth={1.8} />
              <div className="database-metric-copy"><strong>Personagens</strong><b>{dashboard.database.knownCharacters}</b><span>personagens identificados</span></div>
            </div>
            <div className="metric-track"><i aria-hidden="true"><span style={{ width: `${getDatabaseDistribution(dashboard.database.knownCharacters)}%` }} /></i></div>
          </article>
          <article className="database-metric">
            <div className="database-metric-info">
              <Share2 className="metric-glyph" aria-hidden="true" size={24} strokeWidth={1.8} />
              <div className="database-metric-copy"><strong>Relações</strong><b>{dashboard.database.knownRelationships}</b><span>relações registradas</span></div>
            </div>
            <div className="metric-track"><i aria-hidden="true"><span style={{ width: `${getDatabaseDistribution(dashboard.database.knownRelationships)}%` }} /></i></div>
          </article>
          <article className="database-metric">
            <div className="database-metric-info">
              <Landmark className="metric-glyph" aria-hidden="true" size={24} strokeWidth={1.8} />
              <div className="database-metric-copy"><strong>Organizações e conceitos</strong><b>{dashboard.database.knownOrganizationsAndConcepts}</b><span>registros indexados</span></div>
            </div>
            <div className="metric-track"><i aria-hidden="true"><span style={{ width: `${getDatabaseDistribution(dashboard.database.knownOrganizationsAndConcepts)}%` }} /></i></div>
          </article>
        </div>
      </section>

      <section className="dashboard-grid dashboard-secondary" aria-label="Indicadores da jornada">
        <article className="dashboard-card character-progress-card">
          <div className="dashboard-card-heading">
            <div>
              <span className="dashboard-label"><MapPin aria-hidden="true" size={15} strokeWidth={2.2} /> Arquivo de personagens</span>
              <h2>Conhecimento de personagens</h2>
              <p>Seu progresso no conhecimento dos personagens.</p>
            </div>
          </div>
          <div className="character-progress-values">
            <div className="character-stat character-stat-archive">
              <User className="character-stat-icon" aria-hidden="true" size={22} strokeWidth={2} />
              <b>{dashboard.characters.known}</b>
              <span>Personagens identificados</span>
            </div>
            <div className="character-stat character-stat-archive character-stat-classified">
              <EyeOff className="character-stat-icon" aria-hidden="true" size={22} strokeWidth={2} />
              <b>CLASSIFIED</b>
              <span>Novos perfis surgem conforme a jornada avança.</span>
            </div>
          </div>
          <Link className="character-cta" to="/characters"><span>Explorar personagens</span><b aria-hidden="true">→</b></Link>
        </article>
        <article className="dashboard-card quick-stats-card">
          <div className="dashboard-card-heading">
            <div>
              <span className="dashboard-label"><ChartColumn aria-hidden="true" size={14} strokeWidth={2.2} /> Estatísticas rápidas</span>
              <p>Um resumo da sua jornada.</p>
            </div>
          </div>
          <dl className="quick-stats-list">
            <div><dt><Star className="quick-stat-icon" aria-hidden="true" size={25} strokeWidth={2} /><span>Essenciais restantes</span></dt><dd>{dashboard.statistics.essentialRemaining}</dd></div>
            <div><dt><Film className="quick-stat-icon" aria-hidden="true" size={25} strokeWidth={2} /><span>Produções restantes</span></dt><dd>{dashboard.statistics.productionsRemaining}</dd></div>
            <div><dt><FileText className="quick-stat-icon" aria-hidden="true" size={25} strokeWidth={2} /><span>Produções avaliadas</span></dt><dd>{dashboard.statistics.ratedProductions}</dd></div>
            <div><dt><Trophy className="quick-stat-icon" aria-hidden="true" size={25} strokeWidth={2} /><span>Conquistas desbloqueadas</span></dt><dd>{dashboard.statistics.unlockedAchievements}</dd></div>
          </dl>
        </article>
      </section>
    </main>
  );
}
