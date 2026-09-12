import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { to: "/", label: "Início", end: true },
  { to: "/timeline", label: "Timeline" },
  { to: "/database", label: "Database" },
  { to: "/characters", label: "Personagens" },
  { to: "/connections", label: "Conexões" },
  { to: "/achievements", label: "Conquistas" },
  { to: "/ranking", label: "Ranking" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="wrap topbar">
        <NavLink className="brand" to="/" aria-label="MCU Companion, início" onClick={() => setIsMenuOpen(false)}>
          <div className="brandmark">MCU</div>
          <div className="brandcopy">
            <strong>Journey Tracker / Archive</strong>
            <span>Seu universo só sabe o que você já assistiu</span>
          </div>
        </NavLink>
        <button className="navigation-toggle" type="button" aria-label={isMenuOpen ? "Fechar navegação" : "Abrir navegação"} aria-expanded={isMenuOpen} aria-controls="app-navigation" onClick={() => setIsMenuOpen(open => !open)}>
          {isMenuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
        </button>
        <nav id="app-navigation" className={`app-navigation${isMenuOpen ? " is-open" : ""}`} aria-label="Navegação principal">
          {navigation.map(item => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `app-navigation-link${isActive ? " active" : ""}`}
              to={item.to}
              end={item.end}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
