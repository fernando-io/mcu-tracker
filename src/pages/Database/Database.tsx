import { useMemo } from "react";
import {
  Archive,
  Box,
  Check,
  FileText,
  Landmark,
  LockKeyhole,
  MapPin,
  Network,
  UsersRound,
} from "lucide-react";
import { UniverseStatusPanel } from "../../components/UniverseStatusPanel/UniverseStatusPanel";
import { characters } from "../../data/characters";
import { connections, knowledge as knowledgeEntries } from "../../data/connections";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";
import { useJourneyDashboard } from "../../hooks/useJourneyDashboard";
import { hasEncounteredCharacter } from "../../selectors/characters";

function describeRecords(
  count: number,
  singular: string,
  plural: string,
  singularState: string,
  pluralState: string,
  empty: string,
) {
  if (count === 0) return empty;
  return `${count} ${count === 1 ? singular : plural} ${count === 1 ? singularState : pluralState}`;
}

function getArchiveIntegrity(percentage: number) {
  if (percentage >= 84) return { state: "ARQUIVO AVANÇADO", detail: "O sistema consolida informações de múltiplos setores." };
  if (percentage >= 67) return { state: "ARQUIVO CONSISTENTE", detail: "Os registros indexados já formam uma base de inteligência confiável." };
  if (percentage >= 51) return { state: "ARQUIVO PARCIALMENTE RECONSTRUÍDO", detail: "A reconstrução do arquivo revela novas conexões." };
  if (percentage >= 34) return { state: "ARQUIVO EM EXPANSÃO", detail: "Novos registros são integrados conforme a jornada avança." };
  if (percentage >= 17) return { state: "PRIMEIROS REGISTROS INDEXADOS", detail: "O sistema começa a relacionar os dados catalogados." };
  return { state: percentage ? "ARQUIVO INICIADO" : "AGUARDANDO INDEXAÇÃO", detail: "O arquivo aguarda os primeiros registros da jornada." };
}


const recordCategories = [
  {
    kind: "organização",
    label: "Organizações",
    icon: Landmark,
    describe: (count: number) => describeRecords(count, "organização", "organizações", "catalogada", "catalogadas", "Nenhuma organização identificada."),
  },
  {
    kind: "artefato",
    label: "Artefatos",
    icon: Box,
    describe: (count: number) => describeRecords(count, "artefato", "artefatos", "catalogado", "catalogados", "Nenhum artefato identificado."),
  },
  {
    kind: "lugar",
    label: "Locais",
    icon: MapPin,
    describe: (count: number) => describeRecords(count, "local", "locais", "identificado", "identificados", "Nenhum local identificado."),
  },
  {
    kind: "conceito",
    label: "Conceitos",
    icon: FileText,
    describe: (count: number) => describeRecords(count, "conceito", "conceitos", "identificado", "identificados", "Nenhum conceito identificado."),
  },
  {
    kind: "equipe",
    label: "Equipes",
    icon: UsersRound,
    describe: (count: number) => describeRecords(count, "equipe", "equipes", "identificada", "identificadas", "Nenhuma equipe identificada."),
  },
];

export function DatabasePage() {
  const archive = useHomeViewModel({ filter: "all", query: "" });
  const dashboard = useJourneyDashboard();

  const categoryProgress = useMemo(() => recordCategories.map(category => {
    const total = knowledgeEntries.filter(entry => entry.kind === category.kind).length;
    const known = archive.knownKnowledge.filter(entry => entry.kind === category.kind).length;

    return { ...category, total, known };
  }), [archive.knownKnowledge]);

  const recentRecords = useMemo(() => {
    const characterRecords = characters
      .filter(character => hasEncounteredCharacter(character, archive.progressiveKnowledge))
      .map(character => ({
        id: `character-${character.id}`,
        name: character.name,
        kind: "Personagem",
        revealedAt: Math.min(...character.appearances.filter(appearance => archive.progressiveKnowledge.hasWatched(appearance))),
      }));
    const knowledgeRecords = archive.knownKnowledge.map(entry => ({
      id: `knowledge-${entry.name}`,
      name: entry.name,
      kind: entry.kind,
      revealedAt: entry.revealedAt,
    }));
    const connectionRecords = connections
      .filter(connection => archive.progressiveKnowledge.canReveal(connection[2]))
      .map(([source, target, revealedAt]) => ({
        id: `connection-${source}-${target}-${revealedAt}`,
        name: `${source} / ${target}`,
        kind: "Conexão",
        revealedAt,
      }));

    return [...characterRecords, ...knowledgeRecords, ...connectionRecords]
      .sort((left, right) => right.revealedAt - left.revealedAt || left.name.localeCompare(right.name))
      .slice(0, 5);
  }, [archive.knownKnowledge, archive.progressiveKnowledge]);

  const indexedRecords = dashboard.database.knownCharacters
    + dashboard.database.knownRelationships
    + archive.knownKnowledge.length;
  const totalRecords = dashboard.database.totalCharacters
    + dashboard.database.totalRelationships
    + knowledgeEntries.length;
  const isArchiveComplete = dashboard.progress.total > 0
    && dashboard.progress.completed === dashboard.progress.total;
  const integrity = isArchiveComplete
    ? { state: "ARQUIVO TOTALMENTE RECONSTRUÍDO", detail: "Todos os setores do arquivo foram integrados pelo sistema." }
    : getArchiveIntegrity(dashboard.database.percentage);
  const visualProgress = dashboard.database.percentage;
  const reconstructionRows = [
    {
      label: "Personagens",
      known: dashboard.database.knownCharacters,
      total: dashboard.database.totalCharacters,
      description: describeRecords(dashboard.database.knownCharacters, "personagem", "personagens", "indexado", "indexados", "Nenhum personagem identificado."),
    },
    {
      label: "Relações",
      known: dashboard.database.knownRelationships,
      total: dashboard.database.totalRelationships,
      description: describeRecords(dashboard.database.knownRelationships, "relação", "relações", "registrada", "registradas", "Nenhuma relação identificada."),
    },
    ...categoryProgress.map(category => ({
      label: category.label,
      known: category.known,
      total: category.total,
      description: category.describe(category.known),
    })),
  ];

  return (
    <main className="wrap page-content database-intelligence-page">
      <section className="database-intelligence-hero" aria-label="Status do arquivo">
        <article className="database-status-panel">
          <div className="database-panel-kicker"><Archive aria-hidden="true" size={14} /> S.H.I.E.L.D. ARCHIVE</div>
          <h1>STATUS DA DATABASE</h1>
          <p>Reconstrução do arquivo</p>
          <div className="database-status-count">
            <strong>{indexedRecords}</strong>
            <span>registros indexados</span>
          </div>
          <div className="database-overall-progress" aria-label={isArchiveComplete ? "Arquivo totalmente reconstruído" : "Integridade visual do arquivo"}>
            <i><b style={{ width: `${visualProgress}%` }} /></i>
          </div>
          <div className="database-integrity-status">
            <span>INTEGRIDADE DO ARQUIVO</span>
            <strong>{integrity.state}</strong>
            <p>{integrity.detail}</p>
          </div>
          <small>{isArchiveComplete
            ? `${totalRecords} registros catalogados no arquivo completo.`
            : "O sistema incorpora registros conforme a jornada avança."}</small>
        </article>

        <article className="database-classified-panel">
          <div className="database-panel-kicker"><LockKeyhole aria-hidden="true" size={14} /> NÍVEL DE ACESSO</div>
          <span className="database-classified-stamp">{isArchiveComplete ? "ARQUIVO COMPLETO" : "PROTOCOLO CLASSIFIED"}</span>
          <p>{isArchiveComplete
            ? "Todos os registros da jornada foram liberados para consulta no arquivo."
            : "Registros classificados permanecem bloqueados até que suas respectivas produções sejam assistidas."}</p>
          <div className="database-classified-lines" aria-hidden="true">
            <span>{isArchiveComplete ? "ACCESS GRANTED" : "FILE LOCKED"}</span>
            <i />
            <i />
          </div>
        </article>
      </section>

      <UniverseStatusPanel states={archive.latestUniverseStates} />

      <section className="database-intelligence-grid" aria-label="Registros do arquivo">
        <article className="database-intelligence-panel database-records-panel">
          <div className="database-section-heading">
            <div>
              <span>ARQUIVO RECONSTRUÍDO</span>
              <h2>Registros indexados</h2>
            </div>
            <Network aria-hidden="true" size={19} />
          </div>
          <div className="database-record-groups">
            {categoryProgress.map(category => {
              const Icon = category.icon;
              const records = archive.knownKnowledge.filter(entry => entry.kind === category.kind);

              return (
                <section className="database-record-group" key={category.kind}>
                  <div className="database-record-group-head"><Icon aria-hidden="true" size={15} /><strong>{category.label}</strong></div>
                  <p className="database-record-group-summary">{category.describe(category.known)}</p>
                  {records.length ? (
                    <ul>{records.map(record => <li key={record.name}><Check aria-hidden="true" size={12} /> {record.name}</li>)}</ul>
                  ) : null}
                </section>
              );
            })}
          </div>
        </article>

        <article className="database-intelligence-panel database-recent-panel">
          <div className="database-section-heading">
            <div>
              <span>LOG DE SISTEMA</span>
              <h2>Últimas indexações</h2>
            </div>
            <FileText aria-hidden="true" size={19} />
          </div>
          {recentRecords.length ? (
            <ol className="database-recent-list">
              {recentRecords.map(record => (
                <li key={record.id}>
                  <Check aria-hidden="true" size={14} />
                  <div><small className="database-log-record-status">REGISTRO INDEXADO</small><strong>{record.name}</strong><span>{record.kind}</span></div>
                  <small>ARQ.{String(record.revealedAt).padStart(3, "0")}</small>
                </li>
              ))}
            </ol>
          ) : (
            <div className="database-log-empty"><span>&gt; AGUARDANDO PRIMEIRO REGISTRO...</span><p>Os dados recentes aparecerão aqui após a primeira produção.</p></div>
          )}
        </article>
      </section>

      <section className="database-reconstruction-panel" aria-labelledby="database-reconstruction-title">
        <div className="database-section-heading">
          <div>
            <span>INTEGRIDADE DO ARQUIVO</span>
            <h2 id="database-reconstruction-title">Reconstrução do arquivo</h2>
          </div>
          <span className="database-reconstruction-total">{isArchiveComplete ? "100%" : integrity.state}</span>
        </div>
        <div className="database-reconstruction-grid">
          {reconstructionRows.map(row => {
            const width = indexedRecords ? Math.round((row.known / indexedRecords) * 100) : 0;
            return (
              <div className="database-reconstruction-row" key={row.label}>
                <div><strong>{row.label}</strong></div>
                <i aria-label={row.label}><b style={{ width: `${width}%` }} /></i>
                <span>{row.description}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
