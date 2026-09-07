import type { Connection } from "../../types";
import { nodeKind } from "../../utils/mcu";

interface ConnectionGraphProps {
  connections: Connection[];
}

export function ConnectionGraph({ connections }: ConnectionGraphProps) {
  const names = [...new Set(connections.flatMap(connection => [connection[0], connection[1]]))];
  const cx = 500;
  const cy = 260;
  const r = Math.min(205, 130 + names.length * 4);
  const pos = Object.fromEntries(names.map((name, i) => {
    const angle = (Math.PI * 2 * i / names.length) - Math.PI / 2;
    return [name, { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }];
  }));

  return (
    <>
      <div className="section-head">
        <div className="section-title">
          <h2>Mapa de conexões</h2>
          <p>A rede só mostra relações já reveladas.</p>
        </div>
        <div className="count">{names.length} nós • {connections.length} conexões</div>
      </div>
      <svg className="network" viewBox="0 0 1000 520" role="img" aria-label="Mapa de conexões do MCU">
        {!names.length ? (
          <text x="500" y="260" textAnchor="middle" fill="#777" fontSize="18">Assista ao primeiro título para desbloquear a rede.</text>
        ) : (
          <>
            {connections.map(([a, b, at, relation], index) => (
              <line key={`${a}-${b}-${at}-${relation}-${index}`} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke="#333" strokeWidth="2" />
            ))}
            {names.map(name => (
              <g key={name}>
                <circle cx={pos[name].x} cy={pos[name].y} r="16" fill={nodeKind(name) === "org" ? "#6a5acd" : nodeKind(name) === "concept" ? "#b18a3c" : "#9f1014"} stroke="#ddd" />
                <text x={pos[name].x} y={pos[name].y + 31} textAnchor="middle" fill="#ddd" fontSize="11">{name}</text>
              </g>
            ))}
          </>
        )}
      </svg>
      <div className="legend"><span>● Heróis</span><span>● Organizações</span><span>● Vilões / ameaças</span></div>
      <div className="node-list">{names.map(name => <div key={name} className="node-pill">{name}</div>)}</div>
    </>
  );
}
