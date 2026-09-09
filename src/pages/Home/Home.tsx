import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";
import type { FilterId, TabId } from "../../types";
import { EMPTY_PROGRESS_STATE } from "../../state/watchlistProgressPersistence";
import { AchievementCard } from "../../components/AchievementCard/AchievementCard";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { ConnectionGraph } from "../../components/ConnectionGraph/ConnectionGraph";
import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { Tabs } from "../../components/Tabs/Tabs";
import { WatchlistManager } from "../../components/WatchlistManager/WatchlistManager";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabId>("maratona");
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const home = useHomeViewModel({ filter, query });

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "arquivo") setActiveTab("arquivo");
  }, [searchParams]);

  function changeTab(tab: TabId) {
    setActiveTab(tab);
    setSearchParams(tab === "arquivo" ? { tab } : {});
  }

  function updateWatched(movieNumber: number, isWatched: boolean) {
    home.updateActiveProgress(progressState => {
      const watched = new Set(progressState.watched);
      if (isWatched) watched.add(movieNumber);
      else watched.delete(movieNumber);
      return { ...progressState, watched: [...watched] };
    });
  }

  function updateRating(movieNumber: number, score: number) {
    home.updateActiveProgress(progressState => ({
      ...progressState,
      ratings: { ...progressState.ratings, [movieNumber]: score },
    }));
  }

  function updateNote(movieNumber: number, note: string) {
    home.updateActiveProgress(progressState => ({
      ...progressState,
      notes: { ...progressState.notes, [movieNumber]: note },
    }));
  }

  function reset() {
    if (confirm("Apagar progresso, notas e avaliações desta jornada?")) {
      home.updateActiveProgress(() => ({ ...EMPTY_PROGRESS_STATE, watched: [], ratings: {}, notes: {} }));
    }
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(home.progressState, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mcu-progresso.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Header onExport={exportProgress} onReset={reset} />
      <main className="wrap">
        <Hero {...home.hero} />
        <WatchlistManager
          watchlists={home.watchlists}
          activeWatchlist={home.activeWatchlist.watchlist}
          activeProductions={home.watchlistProductions}
          onActivate={home.activateWatchlist}
          onCreate={home.createWatchlist}
          onUpdate={home.updateWatchlist}
          onDuplicate={home.duplicateWatchlist}
          onAddProductions={home.addProductions}
          onRemoveProductions={home.removeProductions}
          onReorderProductions={home.reorderProductions}
          onSearchAvailableProductions={home.searchAvailableProductions}
          onDelete={home.deleteWatchlist}
        />
        <Tabs activeTab={activeTab} onChange={changeTab} />

        <section className={`panel ${activeTab === "maratona" ? "active" : ""}`}>
          <div className="toolbar">
            {[
              ["all", "Todos"],
              ["essential", "🔴 Essenciais"],
              ["recommended", "🟡 Recomendados"],
              ["unwatched", "Não assistidos"],
              ["watched", "Assistidos"],
            ].map(([id, label]) => (
              <button key={id} className={`filter ${filter === id ? "active" : ""}`} onClick={() => setFilter(id as FilterId)}>{label}</button>
            ))}
            <input className="search" placeholder="Buscar filme ou série..." value={query} onChange={event => setQuery(event.target.value)} />
          </div>
          {home.filteredSections.length ? home.filteredSections.map(section => (
            <MovieGrid key={section.name} sectionName={section.name} movies={section.movies} allMovies={home.watchlistProductions} watched={home.watched} ratings={home.progressState.ratings} notes={home.progressState.notes} onToggleWatched={updateWatched} onRate={updateRating} onNoteChange={updateNote} />
          )) : <div className="empty">Nenhuma produção encontrada.</div>}
        </section>

        <section className={`panel ${activeTab === "arquivo" ? "active" : ""}`}>
          <div className="knowledge-layout">
            <div className="card knowledge-card">
              <h3>O que eu sei até aqui</h3>
              <p>Conceitos e lugares desbloqueados apenas pelas produções que você assistiu.</p>
              <div className="chips">{home.knownKnowledge.length ? home.knownKnowledge.map(entry => <span key={entry.name} className="chip">{entry.name} <small>• {entry.kind}</small></span>) : <span className="small">Nenhuma entrada desbloqueada ainda.</span>}</div>
            </div>
            <div className="card knowledge-card">
              <h3>Protocolo CLASSIFIED</h3>
              <p>Entradas futuras continuam ocultas até a produção correspondente ser assistida.</p>
              {home.futureKnowledge.length ? home.futureKnowledge.map(entry => <div key={entry.name} className="classified">████████ — CLASSIFIED</div>) : <div className="small">Nenhuma entrada classificada restante.</div>}
            </div>
          </div>
          <div className="section">
            <div className="section-head"><div className="section-title"><h2>Arquivo de personagens</h2><p>Status conhecido neste exato ponto da maratona.</p></div></div>
            <div className="db-grid">{home.characterCardModels.map((model, index) => <CharacterCard key={model.isUnlocked ? model.id : `classified-${index}`} model={model} />)}</div>
          </div>
        </section>

        <section className={`panel ${activeTab === "conexoes" ? "active" : ""}`}>
          <div className="card connections-wrap"><ConnectionGraph connections={home.visibleConnections} /></div>
        </section>

        <section className={`panel ${activeTab === "status" ? "active" : ""}`}>
          <div className="section">
            <div className="section-head"><div className="section-title"><h2>Onde estamos?</h2><p>Estado atual conhecido do universo, sem olhar para o futuro.</p></div></div>
            <div className="where-list">{home.latestUniverseStates.length ? home.latestUniverseStates.map(universeState => <div key={universeState.title} className="where"><h4>{universeState.title}</h4><p>{universeState.text}</p></div>) : <div className="empty">O arquivo ainda não possui um estado do universo.</div>}</div>
          </div>
        </section>

        <section className={`panel ${activeTab === "conquistas" ? "active" : ""}`}>
          <div className="section">
            <div className="section-head"><div className="section-title"><h2>Conquistas</h2><p>Marcos da sua maratona.</p></div></div>
            <div className="achievement-grid">{home.achievements.map(({ achievement, unlocked }) => <AchievementCard key={achievement.name} achievement={achievement} unlocked={unlocked} />)}</div>
          </div>
        </section>

        <section className={`panel ${activeTab === "ranking" ? "active" : ""}`}>
          <div className="card ranking">
            <div className="section-head"><div className="section-title"><h2>Meu ranking do MCU</h2><p>Ordenado pelas suas próprias notas.</p></div><div className="count">{home.ratedMovies.length} avaliados</div></div>
            {home.ratedMovies.length ? home.ratedMovies.map((movie, index) => <div key={movie.n} className="rank-row"><div className="rank-pos">#{index + 1}</div><div className="rank-title">{movie.t}</div><div className="rank-score">{"★".repeat(home.progressState.ratings[movie.n])}</div></div>) : <div className="empty">Dê uma nota após assistir para montar seu ranking.</div>}
          </div>
        </section>

        <div className="credit">Projeto pessoal de maratona. Regra estrutural: apenas conteúdos vinculados a produções efetivamente assistidas são renderizados.</div>
      </main>
    </>
  );
}
