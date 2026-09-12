import { CheckCircle2, LockKeyhole, Play } from "lucide-react";
import type { Movie } from "../../types";
import { label } from "../../utils/mcu";

interface MovieCardProps {
  movie: Movie;
  watched: boolean;
  isNext: boolean;
  isSectionExpanded: boolean;
  showLockedNext: boolean;
  rating: number;
  note: string;
  onToggleSection: () => void;
  onToggleWatched: (movieNumber: number, watched: boolean) => void;
  onRate: (movieNumber: number, score: number) => void;
  onNoteChange: (movieNumber: number, note: string) => void;
}

export function MovieCard({ movie, watched, isNext, isSectionExpanded, showLockedNext, rating, note, onToggleSection, onToggleWatched, onRate, onNoteChange }: MovieCardProps) {
  const [lab, cls] = label(movie.p);
  const isFuture = movie.p === "future";

  return (
    <article className={`item${watched ? " watched" : ""}${isNext ? " next" : ""}${isFuture ? " future-item" : ""}`}>
      <div className="num">{String(movie.n).padStart(2, "0")}</div>
      <div>
        <div className="card-tags">
          <span className={`badge ${cls}`}>{lab}</span>
          {isNext ? <span className="journey-card-state next"><Play aria-hidden="true" size={11} fill="currentColor" /> Próximo</span> : null}
          {watched ? <span className="journey-card-state watched"><CheckCircle2 aria-hidden="true" size={12} /> Concluído</span> : null}
          {isFuture ? <span className="journey-card-state classified"><LockKeyhole aria-hidden="true" size={11} /> Classificado</span> : null}
        </div>
        <div className="title-line">
          <h3>{movie.t}</h3>
        </div>
        <div className="type">{movie.type}{movie.date ? ` • estreia ${movie.date}` : ""}</div>
      </div>
      <div className="item-actions">
        {watched ? (
          <button className="collapse-toggle" type="button" onClick={onToggleSection} aria-label={`${isSectionExpanded ? "Ocultar" : "Mostrar"} resumos da seção`} aria-expanded={isSectionExpanded}>
            {isSectionExpanded ? "−" : "+"}
          </button>
        ) : null}
        <input
          className="check"
          type="checkbox"
          checked={watched}
          disabled={isFuture}
          aria-label={`Marcar ${movie.t} como assistido`}
          onChange={event => onToggleWatched(movie.n, event.target.checked)}
        />
      </div>
      {watched && isSectionExpanded ? (
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
      {showLockedNext ? (
        <div className="summary-state summary-state-locked">
          <span className="summary-state-icon"><LockKeyhole aria-hidden="true" size={18} /></span>
          <span className="summary-state-copy">
            <strong>Resumo bloqueado</strong>
            <span>Conclua esta produção para<br /> desbloquear seu resumo.</span>
          </span>
        </div>
      ) : null}
    </article>
  );
}