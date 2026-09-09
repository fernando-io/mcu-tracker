import type { FormEvent } from "react";
import { useState } from "react";
import type { Movie } from "../../types";
import type { CustomWatchlistInput, Watchlist, WatchlistProductionId } from "../../watchlists";
import { WatchlistEditorDialog } from "./WatchlistEditorDialog";

type DialogState = "create" | "manage" | "delete" | null;

interface WatchlistManagerProps {
  watchlists: readonly Watchlist[];
  activeWatchlist: Watchlist;
  activeProductions: readonly Movie[];
  onActivate: (watchlistId: Watchlist["id"]) => void;
  onCreate: (input: CustomWatchlistInput) => void;
  onUpdate: (watchlistId: Watchlist["id"], details: Pick<Watchlist, "name" | "description">) => void;
  onDelete: (watchlistId: Watchlist["id"]) => void;
  onAddProductions: (watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => void;
  onRemoveProductions: (watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => void;
  onReorderProductions: (watchlistId: Watchlist["id"], productionIds: readonly WatchlistProductionId[]) => void;
  onSearchAvailableProductions: (watchlist: Watchlist, query: string) => Movie[];
}

export function WatchlistManager({
  watchlists,
  activeWatchlist,
  activeProductions,
  onActivate,
  onCreate,
  onUpdate,
  onDelete,
  onAddProductions,
  onRemoveProductions,
  onReorderProductions,
  onSearchAvailableProductions,
}: WatchlistManagerProps) {
  const [dialog, setDialog] = useState<DialogState>(null);
  const isCustomWatchlist = activeWatchlist.kind === "custom";
  const officialWatchlists = watchlists.filter(watchlist => watchlist.kind === "official");
  const customWatchlists = watchlists.filter(watchlist => watchlist.kind === "custom");

  function createWatchlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    onCreate({
      name: String(form.get("name") ?? ""),
      description: String(form.get("description") ?? ""),
    });
    setDialog(null);
  }

  function deleteWatchlist() {
    onDelete(activeWatchlist.id);
    setDialog(null);
  }

  return (
    <section className="watchlist-manager" aria-labelledby="watchlist-heading">
      <div className="watchlist-manager-head">
        <div>
          <span className="watchlist-kicker">Jornada ativa</span>
          <h2 id="watchlist-heading">Lista de maratona</h2>
        </div>
        <button className="btn watchlist-create" type="button" onClick={() => setDialog("create")}>+ Nova lista</button>
      </div>

      <div className="watchlist-manager-body">
        <label className="watchlist-select-label">
          <span>Selecionar jornada</span>
          <select value={activeWatchlist.id} onChange={event => onActivate(event.target.value)}>
            <optgroup label="Listas oficiais">
              {officialWatchlists.map(watchlist => <option key={watchlist.id} value={watchlist.id}>{watchlist.name}</option>)}
            </optgroup>
            {customWatchlists.length > 0 && (
              <optgroup label="Minhas listas">
                {customWatchlists.map(watchlist => <option key={watchlist.id} value={watchlist.id}>{watchlist.name}</option>)}
              </optgroup>
            )}
          </select>
        </label>

        <div className="watchlist-current">
          <div>
            <div className="watchlist-title-row">
              <strong>{activeWatchlist.name}</strong>
              <span className={`watchlist-kind ${isCustomWatchlist ? "custom" : "official"}`}>
                {isCustomWatchlist ? "Pessoal" : "Oficial"}
              </span>
            </div>
            <p>{activeWatchlist.description}</p>
          </div>
          <span className="watchlist-production-count">{activeWatchlist.productions.length} produções</span>
        </div>

        {isCustomWatchlist && (
          <div className="watchlist-actions" aria-label="Ações da lista">
            <button className="btn" type="button" onClick={() => setDialog("manage")}>Gerenciar</button>
            <button className="btn red" type="button" onClick={() => setDialog("delete")}>Excluir</button>
          </div>
        )}
      </div>

      {dialog === "create" && (
        <div className="watchlist-dialog-backdrop" role="presentation">
          <form className="watchlist-dialog" onSubmit={createWatchlist} role="dialog" aria-modal="true" aria-labelledby="create-watchlist-title">
            <div className="watchlist-dialog-head">
              <div>
                <span className="watchlist-kicker">Nova jornada</span>
                <h3 id="create-watchlist-title">Criar lista</h3>
              </div>
              <button className="dialog-close" type="button" onClick={() => setDialog(null)} aria-label="Fechar">X</button>
            </div>
            <label>
              <span>Nome</span>
              <input name="name" required autoFocus />
            </label>
            <label>
              <span>Descrição</span>
              <textarea name="description" required rows={3} />
            </label>
            <div className="watchlist-dialog-actions">
              <button className="btn" type="button" onClick={() => setDialog(null)}>Cancelar</button>
              <button className="btn red" type="submit">Criar lista</button>
            </div>
          </form>
        </div>
      )}

      {dialog === "manage" && (
        <WatchlistEditorDialog
          watchlist={activeWatchlist}
          productions={activeProductions}
          onSaveDetails={details => onUpdate(activeWatchlist.id, details)}
          onAddProductions={productionIds => onAddProductions(activeWatchlist.id, productionIds)}
          onRemoveProductions={productionIds => onRemoveProductions(activeWatchlist.id, productionIds)}
          onReorderProductions={productionIds => onReorderProductions(activeWatchlist.id, productionIds)}
          onSearchAvailableProductions={query => onSearchAvailableProductions(activeWatchlist, query)}
          onClose={() => setDialog(null)}
        />
      )}

      {dialog === "delete" && (
        <div className="watchlist-dialog-backdrop" role="presentation">
          <div className="watchlist-dialog watchlist-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-watchlist-title">
            <div className="watchlist-dialog-head">
              <div>
                <span className="watchlist-kicker">Ação irreversível</span>
                <h3 id="delete-watchlist-title">Excluir lista?</h3>
              </div>
              <button className="dialog-close" type="button" onClick={() => setDialog(null)} aria-label="Fechar">X</button>
            </div>
            <p>A lista <strong>{activeWatchlist.name}</strong> será removida permanentemente.</p>
            <div className="watchlist-dialog-actions">
              <button className="btn" type="button" onClick={() => setDialog(null)}>Cancelar</button>
              <button className="btn red" type="button" onClick={deleteWatchlist}>Excluir lista</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
