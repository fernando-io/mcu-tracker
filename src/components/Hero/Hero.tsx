import ironmanBackdrop from "../../assets/ironman3.jpg";
import { Stats } from "../Stats/Stats";

interface HeroProps {
  pct: number;
  seen: number;
  releasedTotal: number;
  acquiredKnowledgeCount: number;
  essentialLeft: number;
  ratedCount: number;
  futureCount: number;
}

export function Hero(props: HeroProps) {
  return (
    <section className="hero">
      <img className="timeline-hero-backdrop" src={ironmanBackdrop} alt="" />
      <div className="hero-grid">
        <div className="card hero-card">
          <div className="eyebrow">Spoiler-zero protocol</div>
          <h1>Seu arquivo Marvel<br />cresce com você.</h1>
          <p>Marque cada produção ao terminar. Resumos, personagens, conexões e status do universo só desbloqueiam quando a informação já foi revelada na sua maratona.</p>
        </div>
        <Stats {...props} />
      </div>
    </section>
  );
}

