import { NavLink } from "react-router-dom";

const navigation = [
  { to: "/", label: "Início", end: true },
  { to: "/timeline", label: "Timeline" },
  { to: "/database", label: "Database" },
  { to: "/characters", label: "Personagens" },
  { to: "/connections", label: "Conexões" },
  { to: "/status", label: "Universo" },
  { to: "/achievements", label: "Conquistas" },
  { to: "/ranking", label: "Ranking" },
];

export function Header() {
  return (
    <header>
      <div className="wrap topbar">
        <NavLink className="brand" to="/" aria-label="MCU Companion, início">
          <div className="brandmark">MCU</div>
          <div className="brandcopy">
            <strong>S.H.I.E.L.D. Archive</strong>
            <span>Seu universo só sabe o que você já assistiu</span>
          </div>
        </NavLink>
        <nav className="app-navigation" aria-label="Navegação principal">
          {navigation.map(item => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `app-navigation-link${isActive ? " active" : ""}`}
              to={item.to}
              end={item.end}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
