interface HeaderProps {
  onExport: () => void;
  onReset: () => void;
}

export function Header({ onExport, onReset }: HeaderProps) {
  return (
    <header>
      <div className="wrap topbar">
        <div className="brand">
          <div className="brandmark">MCU</div>
          <div className="brandcopy">
            <strong>S.H.I.E.L.D. Archive</strong>
            <span>Seu universo só sabe o que você já assistiu</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={onExport}>Exportar progresso</button>
          <button className="btn red" onClick={onReset}>Resetar</button>
        </div>
      </div>
    </header>
  );
}
