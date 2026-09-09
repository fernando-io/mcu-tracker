import { useState } from "react";
import type { Movie } from "../../types";
import type { Watchlist, WatchlistProductionId } from "../../watchlists";

interface WatchlistEditorDialogProps {
  watchlist: Watchlist;
  productions: readonly Movie[];
  onSaveDetails: (details: Pick<Watchlist, "name" | "description">) => void;
  onAddProductions: (productionIds: readonly WatchlistProductionId[]) => void;
  onRemoveProductions: (productionIds: readonly WatchlistProductionId[]) => void;
  onReorderProductions: (productionIds: readonly WatchlistProductionId[]) => void;
  onSearchAvailableProductions: (query: string) => Movie[];
  onClose: () => void;
}

export function WatchlistEditorDialog({
  watchlist,
  productions,
  onSaveDetails,
  onAddProductions,
  onRemoveProductions,
  onReorderProductions,
  onSearchAvailableProductions,
  onClose,
}: WatchlistEditorDialogProps) {
  const [name, setName] = useState(watchlist.name);
  const [description, setDescription] = useState(watchlist.description);
  const [query, setQuery] = useState("");
  const searchResults = onSearchAvailableProductions(query);

  function saveDetails() {
    onSaveDetails({ name, description });
  }

  function moveProduction(index: number, offset: -1 | 1) {
    const nextIndex = index + offset;

    if (nextIndex < 0 || nextIndex >= watchlist.productions.length) {
      return;
    }

    const productionIds = [...watchlist.productions];
    [productionIds[index], productionIds[nextIndex]] = [productionIds[nextIndex], productionIds[index]];
    onReorderProductions(productionIds);
  }

  return (
    <div className="watchlist-dialog-backdrop" role="presentation">
      <div className="watchlist-dialog watchlist-editor-dialog" role="dialog" aria-modal="true" aria-labelledby="manage-watchlist-title">
        <div className="watchlist-dialog-head">
          <div>
            <span className="watchlist-kicker">Lista pessoal</span>
            <h3 id="manage-watchlist-title">Gerenciar lista</h3>
          </div>
          <button className="dialog-close" type="button" onClick={onClose} aria-label="Fechar">X</button>
        </div>

        <form className="watchlist-editor-details" onSubmit={event => { event.preventDefault(); saveDetails(); }}>
          <label>
            <span>Nome</span>
            <input value={name} onChange={event => setName(event.target.value)} required />
          </label>
          <label>
            <span>Descrição</span>
            <textarea value={description} onChange={event => setDescription(event.target.value)} rows={3} required />
          </label>
          <button className="btn" type="submit">Salvar detalhes</button>
        </form>

        <div className="watchlist-editor-grid">
          <section className="watchlist-editor-section" aria-labelledby="watchlist-productions-title">
            <div className="watchlist-editor-section-head">
              <div>
                <span className="watchlist-kicker">Ordem da jornada</span>
                <h4 id="watchlist-productions-title">Produções da lista</h4>
              </div>
              <span>{productions.length}</span>
            </div>
            {productions.length ? (
              <div className="watchlist-production-list">
                {productions.map((production, index) => (
                  <div className="watchlist-production-row" key={production.n}>
                    <span className="watchlist-production-index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{production.t}</strong>
                      <span>{production.type}</span>
                    </div>
                    <div className="watchlist-production-actions">
                      <button type="button" onClick={() => moveProduction(index, -1)} disabled={index === 0} aria-label={`Mover ${production.t} para cima`} title="Mover para cima">^</button>
                      <button type="button" onClick={() => moveProduction(index, 1)} disabled={index === productions.length - 1} aria-label={`Mover ${production.t} para baixo`} title="Mover para baixo">v</button>
                      <button className="remove-production" type="button" onClick={() => onRemoveProductions([production.n])} aria-label={`Remover ${production.t}`} title="Remover">X</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="watchlist-editor-empty">Nenhuma produção adicionada.</div>}
          </section>

          <section className="watchlist-editor-section" aria-labelledby="add-productions-title">
            <div className="watchlist-editor-section-head">
              <div>
                <span className="watchlist-kicker">Catálogo disponível</span>
                <h4 id="add-productions-title">Adicionar produções</h4>
              </div>
            </div>
            <input className="watchlist-production-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar filme ou série..." />
            {searchResults.length ? (
              <div className="watchlist-production-list search-results">
                {searchResults.map(production => (
                  <div className="watchlist-production-row" key={production.n}>
                    <span className="watchlist-production-index">{String(production.n).padStart(2, "0")}</span>
                    <div>
                      <strong>{production.t}</strong>
                      <span>{production.type}</span>
                    </div>
                    <button className="add-production" type="button" onClick={() => onAddProductions([production.n])}>Adicionar</button>
                  </div>
                ))}
              </div>
            ) : <div className="watchlist-editor-empty">Nenhuma produção disponível encontrada.</div>}
          </section>
        </div>

        <div className="watchlist-dialog-actions">
          <button className="btn red" type="button" onClick={onClose}>Concluir</button>
        </div>
      </div>
    </div>
  );
}
