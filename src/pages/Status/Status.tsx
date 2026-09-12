import { CircleDot } from "lucide-react";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function StatusPage() {
  const status = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <div className="where-list">{status.latestUniverseStates.length ? status.latestUniverseStates.map(universeState => <div key={universeState.title} className="where"><h4>{universeState.title}</h4><p>{universeState.text}</p></div>) : (
        <section className="universe-empty" aria-labelledby="universe-empty-title">
          <div className="universe-empty-meta"><span><CircleDot aria-hidden="true" size={13} /> STATUS OFFLINE</span><span className="universe-empty-signal" aria-hidden="true" /></div>
          <h2 id="universe-empty-title">Status do Universo</h2>
          <span className="universe-empty-classified">CLASSIFIED</span>
          <p>Arquivo insuficiente para determinar<br />o estado atual do universo.</p>
          <small>Continue indexando registros<br />para reconstruir a linha temporal.</small>
        </section>
      )}</div>
    </main>
  );
}