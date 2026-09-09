import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="wrap page-content home-page">
      <section className="home-page-intro" aria-labelledby="home-title">
        <span className="eyebrow">S.H.I.E.L.D. Archive</span>
        <h1 id="home-title">MCU Companion</h1>
        <p>Escolha uma seção para continuar sua jornada.</p>
        <Link className="btn red" to="/timeline">Abrir timeline</Link>
      </section>
    </main>
  );
}
