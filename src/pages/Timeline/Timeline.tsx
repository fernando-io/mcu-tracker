import { FileDown, RotateCcw, Search, SearchX, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Hero } from "../../components/Hero/Hero";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { WatchlistManager } from "../../components/WatchlistManager/WatchlistManager";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";
import { EMPTY_PROGRESS_STATE } from "../../state/watchlistProgressPersistence";
import type { FilterId } from "../../types";

export function TimelinePage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const timeline = useHomeViewModel({ filter, query });

  function updateWatched(movieNumber: number, isWatched: boolean) {
    timeline.updateActiveProgress(progressState => {
      const watched = new Set(progressState.watched);
      if (isWatched) watched.add(movieNumber);
      else watched.delete(movieNumber);
      return { ...progressState, watched: [...watched] };
    });
  }

  function updateRating(movieNumber: number, score: number) {
    timeline.updateActiveProgress(progressState => ({
      ...progressState,
      ratings: { ...progressState.ratings, [movieNumber]: score },
    }));
  }

  function updateNote(movieNumber: number, note: string) {
    timeline.updateActiveProgress(progressState => ({
      ...progressState,
      notes: { ...progressState.notes, [movieNumber]: note },
    }));
  }

  function reset() {
    if (confirm("Apagar progresso, notas e avaliações desta jornada?")) {
      timeline.updateActiveProgress(() => ({ ...EMPTY_PROGRESS_STATE, watched: [], ratings: {}, notes: {} }));
    }
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(timeline.progressState, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mcu-progresso.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="wrap page-content timeline-page">
      <Hero {...timeline.hero} />
      <section className="timeline-control-panel" aria-label="Central de controle da jornada">
        <WatchlistManager
          watchlists={timeline.watchlists}
          activeWatchlist={timeline.activeWatchlist.watchlist}
          activeProductions={timeline.watchlistProductions}
          onActivate={timeline.activateWatchlist}
          onCreate={timeline.createWatchlist}
          onUpdate={timeline.updateWatchlist}
          onDuplicate={timeline.duplicateWatchlist}
          onAddProductions={timeline.addProductions}
          onRemoveProductions={timeline.removeProductions}
          onReorderProductions={timeline.reorderProductions}
          onSearchAvailableProductions={timeline.searchAvailableProductions}
          onDelete={timeline.deleteWatchlist}
        />
        <div className="timeline-control-tools">
          <div className="timeline-filter-area">
            <span className="timeline-control-label"><SlidersHorizontal aria-hidden="true" size={15} strokeWidth={2} /> Filtros da jornada</span>
            <div className="toolbar">
              {[
                ["all", "Todos"],
                ["essential", "Essenciais"],
                ["recommended", "Recomendados"],
                ["unwatched", "Não assistidos"],
                ["watched", "Assistidos"],
              ].map(([id, label]) => (
                <button key={id} className={`filter ${filter === id ? "active" : ""}`} onClick={() => setFilter(id as FilterId)}>{label}</button>
              ))}
            </div>
          </div>
          <label className="timeline-search">
            <Search aria-hidden="true" size={16} strokeWidth={2} />
            <input className="search" placeholder="Buscar filme ou série..." value={query} onChange={event => setQuery(event.target.value)} />
          </label>
          <div className="timeline-command-actions" aria-label="Ações da jornada">
            <button className="btn" type="button" onClick={exportProgress}><FileDown aria-hidden="true" size={15} strokeWidth={2} /> Exportar</button>
            <button className="btn red" type="button" onClick={reset}><RotateCcw aria-hidden="true" size={15} strokeWidth={2} /> Resetar</button>
          </div>
        </div>
      </section>
      {timeline.filteredSections.length ? timeline.filteredSections.map(section => (
        <MovieGrid
          key={section.name}
          sectionName={section.name}
          movies={section.movies}
          allMovies={timeline.watchlistProductions}
          watched={timeline.watched}
          ratings={timeline.progressState.ratings}
          notes={timeline.progressState.notes}
          onToggleWatched={updateWatched}
          onRate={updateRating}
          onNoteChange={updateNote}
        />
      )) : (
        <section className="timeline-empty" aria-live="polite">
          <SearchX aria-hidden="true" size={24} strokeWidth={1.8} />
          <h2>Nenhuma produção encontrada</h2>
          <p>Ajuste a busca ou os filtros para voltar à sua jornada.</p>
          <button className="btn" type="button" onClick={() => { setFilter("all"); setQuery(""); }}>Limpar filtros</button>
        </section>
      )}
      <div className="credit">Projeto pessoal de maratona. Regra estrutural: apenas conteúdos vinculados a produções efetivamente assistidas são renderizados.</div>
    </main>
  );
}

