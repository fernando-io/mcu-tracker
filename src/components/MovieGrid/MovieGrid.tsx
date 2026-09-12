import { useState } from "react";
import type { Movie } from "../../types";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  sectionName: string;
  movies: Movie[];
  allMovies: Movie[];
  watched: Set<number>;
  ratings: Record<number, number>;
  notes: Record<number, string>;
  onToggleWatched: (movieNumber: number, watched: boolean) => void;
  onRate: (movieNumber: number, score: number) => void;
  onNoteChange: (movieNumber: number, note: string) => void;
}

export function MovieGrid({ sectionName, movies, allMovies, watched, ratings, notes, onToggleWatched, onRate, onNoteChange }: MovieGridProps) {
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);
  const released = allMovies.filter(movie => movie.s === sectionName && movie.p !== "future");
  const seen = released.filter(movie => watched.has(movie.n)).length;
  const nextMovieNumber = allMovies.find(movie => movie.p !== "future" && !watched.has(movie.n))?.n;
  const sectionPercentage = released.length ? Math.round((seen / released.length) * 100) : 0;
  const lastMovieNumber = movies[movies.length - 1]?.n;

  const toggleSection = () => setIsSectionExpanded(current => !current);

  const handleToggleWatched = (movieNumber: number, value: boolean) => {
    if (value) setIsSectionExpanded(true);
    onToggleWatched(movieNumber, value);
  };

  return (
    <section className="section">
      <div className="section-head">
        <div className="section-title">
          <h2>{sectionName}</h2>
          <p>{sectionName === "Próximos" ? "Produções futuras" : "Marque ao terminar; o resumo só abre depois."}</p>
        </div>
        <div className="timeline-section-status">
          <div className="count">{sectionName === "Próximos" ? `${movies.length} futuros` : `${seen} / ${released.length} assistidos`}</div>
          {released.length > 0 && <div className="section-progress" aria-label={`${sectionPercentage}% da saga concluída`}><span style={{ width: `${sectionPercentage}%` }} /></div>}
        </div>
      </div>
      <div className="grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.n}
            movie={movie}
            watched={watched.has(movie.n)}
            isNext={movie.n === nextMovieNumber}
            isSectionExpanded={isSectionExpanded}
            showLockedNext={isSectionExpanded && movie.n === nextMovieNumber}
            rating={ratings[movie.n] || 0}
            note={notes[movie.n] || ""}
            onToggleSection={toggleSection}
            onToggleWatched={handleToggleWatched}
            onRate={onRate}
            onNoteChange={onNoteChange}
          />
        ))}
      </div>
    </section>
  );
}