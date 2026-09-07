import { useState } from "react";
import type { Movie } from "../../types";
import { label } from "../../utils/mcu";

interface MovieCardProps {
  movie: Movie;
  watched: boolean;
  rating: number;
  note: string;
  onToggleWatched: (movieNumber: number, watched: boolean) => void;
  onRate: (movieNumber: number, score: number) => void;
  onNoteChange: (movieNumber: number, note: string) => void;
}

export function MovieCard({ movie, watched, rating, note, onToggleWatched, onRate, onNoteChange }: MovieCardProps) {
  const [lab, cls] = label(movie.p);
  const [showContent, setShowContent] = useState(true);

  return (
    <article className={`item${watched ? " watched" : ""}`}>
      <div className="num">{String(movie.n).padStart(2, "0")}</div>
      <div>
        <div className="title-line">
          <h3>{movie.t}</h3>
          <span className={`badge ${cls}`}>{lab}</span>
        </div>
        <div className="type">{movie.type}{movie.date ? ` • estreia ${movie.date}` : ""}</div>
        {movie.p === "future" ? <div className="future-note">Ainda bloqueado.</div> : null}
      </div>
      <div className="item-actions">
        {watched ? (
          <button className="collapse-toggle" type="button" onClick={() => setShowContent(value => !value)} aria-label={`${showContent ? "Ocultar" : "Mostrar"} conteúdo de ${movie.t}`}>
            {showContent ? "−" : "+"}
          </button>
        ) : null}
        <input
          className="check"
          type="checkbox"
          checked={watched}
          disabled={movie.p === "future"}
          aria-label={`Marcar ${movie.t} como assistido`}
          onChange={event => onToggleWatched(movie.n, event.target.checked)}
        />
      </div>
      {watched && showContent ? (
        <div className="summary">
          <b>O que você sabe até aqui:</b><br />{movie.sum}
          <div className="reaction">
            <div className="rating" aria-label="Sua nota de 1 a 5">
              {[1, 2, 3, 4, 5].map(score => (
                <button key={score} className={`star ${score <= rating ? "on" : ""}`} type="button" onClick={() => onRate(movie.n, score)}>
                  ★
                </button>
              ))}
            </div>
            <textarea className="note" placeholder="Minha reação..." value={note} onChange={event => onNoteChange(movie.n, event.target.value)} />
          </div>
        </div>
      ) : null}
    </article>
  );
}
