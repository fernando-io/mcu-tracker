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
  const released = allMovies.filter(movie => movie.s === sectionName && movie.p !== "future");
  const seen = released.filter(movie => watched.has(movie.n)).length;

  return (
    <section className="section">
      <div className="section-head">
        <div className="section-title">
          <h2>{sectionName}</h2>
          <p>{sectionName === "Próximos" ? "Produções futuras" : "Marque ao terminar; o resumo só abre depois."}</p>
        </div>
        <div className="count">{sectionName === "Próximos" ? `${movies.length} futuros` : `${seen} / ${released.length} assistidos`}</div>
      </div>
      <div className="grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.n}
            movie={movie}
            watched={watched.has(movie.n)}
            rating={ratings[movie.n] || 0}
            note={notes[movie.n] || ""}
            onToggleWatched={onToggleWatched}
            onRate={onRate}
            onNoteChange={onNoteChange}
          />
        ))}
      </div>
    </section>
  );
}
