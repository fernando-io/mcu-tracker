import { CircleDot } from "lucide-react";
import type { UniverseState } from "../../types";

interface UniverseStatusPanelProps {
  states: UniverseState[];
}

export function UniverseStatusPanel({ states }: UniverseStatusPanelProps) {
  return (
    <section className="database-universe" aria-labelledby="universe-status-title">
      <div className="database-universe-head">
        <h2 id="universe-status-title">Status do Universo</h2>
        <p>O estado atual do universo é reconstruído automaticamente a partir dos registros indexados.</p>
      </div>
      {states.length ? (
        <div className="universe-status-grid">
          {states.map(state => (
            <article className="universe-status-card" key={state.title}>
              <span><CircleDot aria-hidden="true" size={13} /> REGISTRO ATIVO</span>
              <h3>{state.title}</h3>
              <p>{state.text}</p>
            </article>
          ))}
        </div>
      ) : (
        <section className="universe-empty" aria-label="Status do universo indisponível">
          <div className="universe-empty-meta"><span><CircleDot aria-hidden="true" size={13} /> STATUS OFFLINE</span><span className="universe-empty-signal" aria-hidden="true" /></div>
          <span className="universe-empty-classified">CLASSIFIED</span>
          <p>Arquivo insuficiente para determinar<br />o estado atual do universo.</p>
          <small>Continue sua jornada para que o arquivo<br />reconstrua os primeiros indicadores.</small>
        </section>
      )}
    </section>
  );
}
