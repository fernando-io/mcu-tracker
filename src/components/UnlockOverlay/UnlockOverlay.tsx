import { Check, Database, Landmark, ShieldCheck, Share2, Sparkles, Trophy, Users, X } from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import type { UnlockCategory, UnlockGroup, UnlockItem } from "../../viewModels/unlocks";

interface UnlockOverlayProps {
  groups: UnlockGroup[];
  onClose: () => void;
}

interface IndexedRecord {
  category: UnlockCategory;
  groupTitle: string;
  item: UnlockItem;
}

const COMPACT_GROUP_THRESHOLD = 5;
const INDEXING_PRELUDE_MS = 600;
const CHARACTER_TYPING_MS = 38;
const RECORD_HOLD_MS = 460;
const INDEXING_COMPLETE_MS = 320;
const REVEAL_CATEGORY_STAGGER_MS = 150;
const REVEAL_ITEM_STAGGER_MS = 120;
const OVERLAY_CLOSE_MS = 220;

const categoryIcons: Record<string, typeof Users> = {
  characters: Users,
  relationships: Share2,
  knowledge: Landmark,
  events: Sparkles,
  achievements: Trophy,
};

function indexingStatus(category: UnlockCategory) {
  if (category === "characters") return "INDEXANDO PERSONAGENS...";
  if (category === "relationships") return "VERIFICANDO CONEXÕES...";
  if (category === "knowledge" || category === "events") return "SINCRONIZANDO DATABASE...";
  if (category === "achievements") return "VALIDANDO CONQUISTAS...";
  return "LOCALIZANDO REGISTROS...";
}

export function UnlockOverlay({ groups, onClose }: UnlockOverlayProps) {
  const records = useMemo<IndexedRecord[]>(() => groups.flatMap(group => group.items.map(item => ({
    category: group.id,
    groupTitle: group.title,
    item,
  }))), [groups]);
  const [phase, setPhase] = useState<"indexing" | "revealed">("indexing");
  const [processed, setProcessed] = useState(0);
  const [status, setStatus] = useState("ANALISANDO ARQUIVOS...");
  const [indexedRecords, setIndexedRecords] = useState<IndexedRecord[]>([]);
  const [typingRecord, setTypingRecord] = useState<IndexedRecord | null>(null);
  const [typedLabel, setTypedLabel] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(closeTimeout.current), []);

  useEffect(() => {
    const timeouts: number[] = [];
    const schedule = (callback: () => void, delay: number) => {
      const timeout = window.setTimeout(callback, delay);
      timeouts.push(timeout);
    };

    const indexRecord = (recordIndex: number) => {
      const record = records[recordIndex];
      let characterIndex = 0;
      setTypingRecord(record);
      setTypedLabel("");
      setStatus(indexingStatus(record.category));

      const typeCharacter = () => {
        characterIndex += 1;
        setTypedLabel(record.item.label.slice(0, characterIndex));

        if (characterIndex < record.item.label.length) {
          schedule(typeCharacter, CHARACTER_TYPING_MS);
          return;
        }

        setIndexedRecords(current => [...current, record].slice(-2));
        setTypingRecord(null);
        setProcessed(recordIndex + 1);

        if (recordIndex + 1 === records.length) {
          setStatus("PROTOCOLO DE REVELAÇÃO CONCLUÍDO");
          setAccessGranted(true);
          schedule(() => setPhase("revealed"), INDEXING_COMPLETE_MS);
          return;
        }

        schedule(() => indexRecord(recordIndex + 1), RECORD_HOLD_MS);
      };

      schedule(typeCharacter, CHARACTER_TYPING_MS);
    };

    schedule(() => indexRecord(0), INDEXING_PRELUDE_MS);
    return () => timeouts.forEach(timeout => window.clearTimeout(timeout));
  }, [records]);

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimeout.current = window.setTimeout(onClose, OVERLAY_CLOSE_MS);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase === "revealed") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, isClosing]);

  const typingProgress = typingRecord ? typedLabel.length / typingRecord.item.label.length : 0;
  const progress = Math.round(((processed + typingProgress) / records.length) * 100);

  return (
    <div className={`unlock-overlay${isClosing ? " is-closing" : ""}`} role="presentation">
      <section className={`unlock-terminal ${phase === "revealed" ? "is-revealed" : "is-indexing"}`} role="dialog" aria-modal="true" aria-labelledby="unlock-overlay-title">
        <div className="unlock-terminal-scanlines" aria-hidden="true" />
        <header className="unlock-terminal-head">
          <span className="unlock-terminal-brand"><ShieldCheck aria-hidden="true" size={16} /> S.H.I.E.L.D. ARCHIVE</span>
          {phase === "revealed" ? <button className="unlock-close" type="button" onClick={requestClose} aria-label="Fechar registros desbloqueados"><X aria-hidden="true" size={17} /></button> : null}
        </header>

        {phase === "indexing" ? (
          <div className="unlock-indexing" aria-live="polite">
            <Database aria-hidden="true" size={35} strokeWidth={1.5} />
            <strong id="unlock-overlay-title">{status}</strong>
            <span className={`unlock-progress ${accessGranted ? "is-complete" : ""}`}><i style={{ width: `${progress}%` }} /></span>
            <span className={`unlock-progress-label ${accessGranted ? "is-complete" : ""}`}>{accessGranted ? "100% · ACCESS GRANTED" : `${progress}% · ${processed} DE ${records.length} REGISTROS INDEXADOS`}</span>
            <div className="unlock-index-log" aria-label="Registros processados">
              {indexedRecords.map(record => {
                const Icon = categoryIcons[record.category] || Database;
                return <span className="unlock-index-record" key={`${record.item.id}-${record.category}`}><Check className="unlock-index-check" aria-hidden="true" size={12} /><Icon aria-hidden="true" size={12} /> {record.item.label}</span>;
              })}
              {typingRecord ? (() => {
                const Icon = categoryIcons[typingRecord.category] || Database;
                return <span className="unlock-index-record is-typing"><Icon aria-hidden="true" size={12} /> {typedLabel}</span>;
              })() : null}
            </div>
          </div>
        ) : (
          <div className="unlock-revealed">
            <div className="unlock-revealed-intro">
              <span>PROTOCOLO DE REVELAÇÃO CONCLUÍDO</span>
              <h2 id="unlock-overlay-title">Novos registros liberados</h2>
            </div>
            <div className="unlock-groups">
              {groups.map((group, groupIndex) => {
                const Icon = categoryIcons[group.id] || Database;
                const isCompact = group.items.length > COMPACT_GROUP_THRESHOLD;
                const categoryDelay = groupIndex * REVEAL_CATEGORY_STAGGER_MS;

                return (
                  <section className="unlock-group" key={group.id} style={{ "--unlock-delay": `${categoryDelay}ms` } as CSSProperties}>
                    <h3><Icon aria-hidden="true" size={16} /> {group.title}</h3>
                    {isCompact ? (
                      <p className="unlock-count">+{group.items.length} {group.title}</p>
                    ) : (
                      <ul>
                        {group.items.map((item, index) => (
                          <li key={item.id} style={{ "--unlock-delay": `${categoryDelay + (index * REVEAL_ITEM_STAGGER_MS)}ms` } as CSSProperties}><Check aria-hidden="true" size={14} /> {item.label}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
            <button className="btn red unlock-continue" type="button" onClick={requestClose}>Continuar jornada</button>
          </div>
        )}
      </section>
    </div>
  );
}