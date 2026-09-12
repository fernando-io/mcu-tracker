import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function RankingPage() {
  const ranking = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <section className="page-context" aria-labelledby="ranking-title">
        <h1 id="ranking-title">Meu ranking do MCU</h1>
        <p>Ordenado pelas suas próprias notas.</p>
      </section>
      <div className="card ranking">
        {ranking.ratedMovies.length ? ranking.ratedMovies.map((movie, index) => <div key={movie.n} className="rank-row"><div className="rank-pos">#{index + 1}</div><div className="rank-title">{movie.t}</div><div className="rank-score">{"★".repeat(ranking.progressState.ratings[movie.n])}</div></div>) : (
          <section className="ranking-empty" aria-labelledby="ranking-empty-title">
            <div className="ranking-empty-podium" aria-hidden="true"><i /><i /><i /></div>
            <div>
              <h2 id="ranking-empty-title">Ainda não existe um ranking.</h2>
              <p>Avalie as produções assistidas<br />para construir seu ranking pessoal.</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
