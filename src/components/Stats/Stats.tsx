interface StatsProps {
  pct: number;
  seen: number;
  releasedTotal: number;
  acquiredKnowledgeCount: number;
  essentialLeft: number;
  ratedCount: number;
  futureCount: number;
}

export function Stats({ pct, seen, releasedTotal, acquiredKnowledgeCount, essentialLeft, ratedCount, futureCount }: StatsProps) {
  return (
    <div className="card stats-card">
      <div className="progress-row">
        <div>
          <div className="big">{pct}%</div>
          <div className="small">{seen} de {releasedTotal} lançados assistidos</div>
        </div>
        <div className="small">Conhecimento adquirido<br /><b>{acquiredKnowledgeCount}</b></div>
      </div>
      <div className="bar"><span style={{ width: `${pct}%` }} /></div>
      <div className="stats-mini">
        <div className="mini"><b>{seen}</b><span>Assistidos</span></div>
        <div className="mini"><b>{essentialLeft}</b><span>Essenciais faltando</span></div>
        <div className="mini"><b>{ratedCount}</b><span>Avaliados</span></div>
        <div className="mini"><b>{futureCount}</b><span>Futuros</span></div>
      </div>
    </div>
  );
}


