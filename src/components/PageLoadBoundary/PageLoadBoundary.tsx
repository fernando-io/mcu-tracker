import { useEffect, useState } from "react";

export type SkeletonPage = "home" | "timeline" | "database" | "characters" | "connections";

interface DeferredPageSkeletonProps {
  page: SkeletonPage;
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`skeleton-block ${className}`} />;
}

function HomeSkeleton() {
  return (
    <main className="wrap page-content dashboard-page skeleton-page skeleton-home" aria-busy="true">
      <section className="dashboard-hero skeleton-home-hero">
        <div className="dashboard-hero-copy"><SkeletonBlock className="skeleton-kicker" /><SkeletonBlock className="skeleton-title" /><SkeletonBlock className="skeleton-copy" /><SkeletonBlock className="skeleton-copy short" /></div>
      </section>
      <section className="dashboard-grid dashboard-primary"><article className="dashboard-card skeleton-card skeleton-continue" /><article className="dashboard-card skeleton-card skeleton-journey" /></section>
      <section className="dashboard-database skeleton-database"><div className="skeleton-section-head"><div><SkeletonBlock className="skeleton-kicker" /><SkeletonBlock className="skeleton-heading" /></div><SkeletonBlock className="skeleton-icon" /></div><div className="dashboard-grid dashboard-metrics">{Array.from({ length: 3 }, (_, index) => <article className="database-metric skeleton-metric" key={index}><SkeletonBlock className="skeleton-round" /><div><SkeletonBlock className="skeleton-line" /><SkeletonBlock className="skeleton-number" /></div><SkeletonBlock className="skeleton-track" /></article>)}</div></section>
      <section className="dashboard-grid dashboard-secondary"><article className="dashboard-card skeleton-card skeleton-secondary" /><article className="dashboard-card skeleton-card skeleton-secondary" /></section>
    </main>
  );
}

function TimelineSkeleton() {
  return (
    <main className="wrap page-content timeline-page skeleton-page skeleton-timeline" aria-busy="true">
      <section className="hero skeleton-timeline-hero"><div className="hero-grid"><div className="hero-card"><SkeletonBlock className="skeleton-kicker" /><SkeletonBlock className="skeleton-title" /><SkeletonBlock className="skeleton-copy" /></div><div className="stats-card"><SkeletonBlock className="skeleton-number" /><SkeletonBlock className="skeleton-track" /></div></div></section>
      <section className="timeline-control-panel skeleton-controls"><SkeletonBlock className="skeleton-heading" /><div><SkeletonBlock className="skeleton-control" /><SkeletonBlock className="skeleton-control" /><SkeletonBlock className="skeleton-control" /></div></section>
      {Array.from({ length: 2 }, (_, section) => <section className="section skeleton-timeline-section" key={section}><div className="section-head"><div><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-line short" /></div></div><div className="grid">{Array.from({ length: 4 }, (_, item) => <article className="item skeleton-item" key={item}><SkeletonBlock className="skeleton-square" /><div><SkeletonBlock className="skeleton-line" /><SkeletonBlock className="skeleton-line short" /></div></article>)}</div></section>)}
    </main>
  );
}

function DatabaseSkeleton() {
  return (
    <main className="wrap page-content database-intelligence-page skeleton-page skeleton-database-page" aria-busy="true">
      <section className="database-intelligence-hero"><article className="database-status-panel skeleton-panel"><SkeletonBlock className="skeleton-kicker" /><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-number" /><SkeletonBlock className="skeleton-track" /></article><article className="database-classified-panel skeleton-panel"><SkeletonBlock className="skeleton-kicker" /><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-copy" /></article></section>
      <section className="database-universe skeleton-universe"><div className="database-universe-head"><SkeletonBlock className="skeleton-kicker" /><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-copy" /></div><div className="universe-status-grid">{Array.from({ length: 3 }, (_, index) => <article className="universe-status-card skeleton-panel" key={index}><SkeletonBlock className="skeleton-line" /><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-copy" /></article>)}</div></section>
      <section className="database-intelligence-grid"><article className="database-intelligence-panel skeleton-panel" /><article className="database-intelligence-panel skeleton-panel" /></section>
      <section className="database-reconstruction-panel skeleton-panel"><SkeletonBlock className="skeleton-heading" /><div className="skeleton-reconstruction-rows">{Array.from({ length: 6 }, (_, index) => <SkeletonBlock className="skeleton-track" key={index} />)}</div></section>
    </main>
  );
}

function CharactersSkeleton() {
  return <main className="wrap page-content skeleton-page" aria-busy="true"><div className="db-grid skeleton-character-grid">{Array.from({ length: 6 }, (_, index) => <article className="skeleton-character-card" key={index}><SkeletonBlock className="skeleton-portrait" /><div><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-copy" /><SkeletonBlock className="skeleton-line short" /></div></article>)}</div></main>;
}

function ConnectionsSkeleton() {
  return <main className="wrap page-content skeleton-page" aria-busy="true"><section className="card connections-wrap skeleton-connections"><div className="section-head"><div><SkeletonBlock className="skeleton-heading" /><SkeletonBlock className="skeleton-copy" /></div></div><div className="network skeleton-network"><SkeletonBlock className="skeleton-radar" /></div><div className="node-list">{Array.from({ length: 6 }, (_, index) => <SkeletonBlock className="skeleton-node" key={index} />)}</div></section></main>;
}

function PageSkeleton({ page }: { page: SkeletonPage }) {
  if (page === "home") return <HomeSkeleton />;
  if (page === "timeline") return <TimelineSkeleton />;
  if (page === "database") return <DatabaseSkeleton />;
  if (page === "characters") return <CharactersSkeleton />;
  return <ConnectionsSkeleton />;
}

export function DeferredPageSkeleton({ page }: DeferredPageSkeletonProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShouldShow(true), 180);
    return () => window.clearTimeout(timeout);
  }, []);

  return shouldShow ? <><span className="skeleton-reader">Carregando arquivo...</span><PageSkeleton page={page} /></> : null;
}
