import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function DatabasePage() {
  const database = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <div className="knowledge-layout">
        <div className="card knowledge-card">
          <h3>O que eu sei até aqui</h3>
          <p>Conceitos e lugares desbloqueados apenas pelas produções que você assistiu.</p>
          <div className="chips">{database.knownKnowledge.length ? database.knownKnowledge.map(entry => <span key={entry.name} className="chip">{entry.name} <small>• {entry.kind}</small></span>) : <span className="small">Nenhuma entrada desbloqueada ainda.</span>}</div>
        </div>
        <div className="card knowledge-card">
          <h3>Protocolo CLASSIFIED</h3>
          <p>Entradas futuras continuam ocultas até a produção correspondente ser assistida.</p>
          {database.futureKnowledge.length ? database.futureKnowledge.map(entry => <div key={entry.name} className="classified">████████ — CLASSIFIED</div>) : <div className="small">Nenhuma entrada classificada restante.</div>}
        </div>
      </div>
    </main>
  );
}
