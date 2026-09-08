import type { Movie } from "../../types";

interface AppearanceCardProps {
  production: Movie;
}

export function AppearanceCard({ production }: AppearanceCardProps) {
  return (
    <div className="dossier-record history-record">
      <span>{String(production.n).padStart(2, "0")}</span>
      <div><h4>{production.t}</h4><p>{production.type}</p></div>
    </div>
  );
}
