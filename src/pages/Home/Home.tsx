import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { achievements } from "../../data/achievements";
import { characters } from "../../data/characters";
import { connections, knowledge as knowledgeEntries, universeStates } from "../../data/connections";
import { useActiveWatchlist } from "../../hooks/useActiveWatchlist";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { FilterId, TabId } from "../../types";
import { visible } from "../../utils/mcu";
import { createProgressiveKnowledge } from "../../engines/progressiveKnowledge";
import { AchievementCard } from "../../components/AchievementCard/AchievementCard";
import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { ConnectionGraph } from "../../components/ConnectionGraph/ConnectionGraph";
import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { Tabs } from "../../components/Tabs/Tabs";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useLocalStorage();
  const [activeTab, setActiveTab] = useState<TabId>("maratona");
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");

  const watched = useMemo(() => new Set(state.watched || []), [state.watched]);
  const progressiveKnowledge = useMemo(() => createProgressiveKnowledge(watched), [watched]);
  const activeWatchlist = useActiveWatchlist(watched);
  const watchlistProductions = useMemo(() => activeWatchlist.getProductions(), [activeWatchlist]);
  const released = useMemo(() => watchlistProductions.filter(movie => movie.p !== "future"), [watchlistProductions]);
  const seen = useMemo(() => released.filter(movie => watched.has(movie.n)).length, [released, watched]);
  const pct = Math.round(seen / released.length * 100) || 0;
  const filteredSections = useMemo(() => [...new Set(watchlistProductions.map(movie => movie.s))]
    .map(name => ({
      name,
      movies: watchlistProductions.filter(movie => movie.s === name && visible(movie, query.trim().toLowerCase(), filter, watched)),
    }))
    .filter(section => section.movies.length), [filter, query, watched, watchlistProductions]);
  const knownKnowledge = knowledgeEntries.filter(entry => progressiveKnowledge.canReveal(entry));
  const futureKnowledge = knowledgeEntries.filter(entry => !progressiveKnowledge.canReveal(entry)).slice(0, 5);
  const visibleConnections = connections.filter(connection => progressiveKnowledge.canReveal(connection[2]));
  const latestUniverseStates = Object.values(Object.fromEntries(universeStates.filter(state => progressiveKnowledge.canReveal(state)).map(state => [state.title, state])));
  const ratedMovies = watchlistProductions
    .filter(movie => state.ratings[movie.n] > 0)
    .sort((a, b) => (state.ratings[b.n] - state.ratings[a.n]) || (a.n - b.n));

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "arquivo") setActiveTab("arquivo");
  }, [searchParams]);

  function changeTab(tab: TabId) {
    setActiveTab(tab);
    setSearchParams(tab === "arquivo" ? { tab } : {});
  }

  function updateWatched(movieNumber: number, isWatched: boolean) {
    const next = new Set(watched);
    if (isWatched) next.add(movieNumber);
    else next.delete(movieNumber);
    setState(prev => ({ ...prev, watched: [...next] }));
  }

  function updateRating(movieNumber: number, score: number) {
    setState(prev => ({ ...prev, ratings: { ...prev.ratings, [movieNumber]: score } }));
  }

  function updateNote(movieNumber: number, note: string) {
    setState(prev => ({ ...prev, notes: { ...prev.notes, [movieNumber]: note } }));
  }

  function reset() {
    if (confirm("Apagar progresso, notas e avaliações?")) {
      setState({ watched: [], ratings: {}, notes: {} });
    }
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcu-progresso.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Header onExport={exportProgress} onReset={reset} />
      <main className="wrap">
        <Hero
          pct={pct}
          seen={seen}
          releasedTotal={released.length}
          acquiredKnowledgeCount={progressiveKnowledge.acquiredCount}
          essentialLeft={watchlistProductions.filter(movie => movie.p === "essential" && !watched.has(movie.n)).length}
          ratedCount={watchlistProductions.filter(movie => state.ratings[movie.n] > 0).length}
          futureCount={watchlistProductions.filter(movie => movie.p === "future").length}
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
          {filteredSections.length ? filteredSections.map(section => (
            <MovieGrid key={section.name} sectionName={section.name} movies={section.movies} allMovies={watchlistProductions} watched={watched} ratings={state.ratings} notes={state.notes} onToggleWatched={updateWatched} onRate={updateRating} onNoteChange={updateNote} />
          )) : <div className="empty">Nenhuma produção encontrada.</div>}
        </section>

        <section className={`panel ${activeTab === "arquivo" ? "active" : ""}`}>
          <div className="knowledge-layout">
            <div className="card knowledge-card">
              <h3>O que eu sei até aqui</h3>
              <p>Conceitos e lugares desbloqueados apenas pelas produções que você assistiu.</p>
              <div className="chips">{knownKnowledge.length ? knownKnowledge.map(entry => <span key={entry.name} className="chip">{entry.name} <small>• {entry.kind}</small></span>) : <span className="small">Nenhuma entrada desbloqueada ainda.</span>}</div>
            </div>
            <div className="card knowledge-card">
              <h3>Protocolo CLASSIFIED</h3>
              <p>Entradas futuras continuam ocultas até a produção correspondente ser assistida.</p>
              {futureKnowledge.length ? futureKnowledge.map(entry => <div key={entry.name} className="classified">████████ — CLASSIFIED</div>) : <div className="small">Nenhuma entrada classificada restante.</div>}
            </div>
          </div>
          <div className="section">
            <div className="section-head"><div className="section-title"><h2>Arquivo de personagens</h2><p>Status conhecido neste exato ponto da maratona.</p></div></div>
            <div className="db-grid">{characters.map(character => <CharacterCard key={character.name} character={character} knowledge={progressiveKnowledge} />)}</div>
          </div>
        </section>

        <section className={`panel ${activeTab === "conexoes" ? "active" : ""}`}>
          <div className="card connections-wrap"><ConnectionGraph connections={visibleConnections} /></div>
        </section>

        <section className={`panel ${activeTab === "status" ? "active" : ""}`}>
          <div className="section">
            <div className="section-head"><div className="section-title"><h2>Onde estamos?</h2><p>Estado atual conhecido do universo, sem olhar para o futuro.</p></div></div>
            <div className="where-list">{latestUniverseStates.length ? latestUniverseStates.map(state => <div key={state.title} className="where"><h4>{state.title}</h4><p>{state.text}</p></div>) : <div className="empty">O arquivo ainda não possui um estado do universo.</div>}</div>
          </div>
        </section>

        <section className={`panel ${activeTab === "conquistas" ? "active" : ""}`}>
          <div className="section">
            <div className="section-head"><div className="section-title"><h2>Conquistas</h2><p>Marcos da sua maratona.</p></div></div>
            <div className="achievement-grid">{achievements.map(achievement => <AchievementCard key={achievement.name} achievement={achievement} unlocked={achievement.test(progressiveKnowledge)} />)}</div>
          </div>
        </section>

        <section className={`panel ${activeTab === "ranking" ? "active" : ""}`}>
          <div className="card ranking">
            <div className="section-head"><div className="section-title"><h2>Meu ranking do MCU</h2><p>Ordenado pelas suas próprias notas.</p></div><div className="count">{ratedMovies.length} avaliados</div></div>
            {ratedMovies.length ? ratedMovies.map((movie, index) => <div key={movie.n} className="rank-row"><div className="rank-pos">#{index + 1}</div><div className="rank-title">{movie.t}</div><div className="rank-score">{"★".repeat(state.ratings[movie.n])}</div></div>) : <div className="empty">Dê uma nota após assistir para montar seu ranking.</div>}
          </div>
        </section>

        <div className="credit">Projeto pessoal de maratona. Regra estrutural: apenas conteúdos vinculados a produções efetivamente assistidas são renderizados.</div>
      </main>
    </>
  );
}

