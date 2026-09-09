import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function StatusPage() {
  const status = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <div className="where-list">{status.latestUniverseStates.length ? status.latestUniverseStates.map(universeState => <div key={universeState.title} className="where"><h4>{universeState.title}</h4><p>{universeState.text}</p></div>) : <div className="empty">O arquivo ainda não possui um estado do universo.</div>}</div>
    </main>
  );
}
