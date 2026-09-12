import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { DeferredPageSkeleton } from "./components/PageLoadBoundary/PageLoadBoundary";
import { AchievementsPage } from "./pages/Achievements/Achievements";
import { CharacterPage } from "./pages/Character/Character";
import { RankingPage } from "./pages/Ranking/Ranking";

const Home = lazy(() => import("./pages/Home/Home").then(module => ({ default: module.Home })));
const TimelinePage = lazy(() => import("./pages/Timeline/Timeline").then(module => ({ default: module.TimelinePage })));
const DatabasePage = lazy(() => import("./pages/Database/Database").then(module => ({ default: module.DatabasePage })));
const CharactersPage = lazy(() => import("./pages/Characters/Characters").then(module => ({ default: module.CharactersPage })));
const ConnectionsPage = lazy(() => import("./pages/Connections/Connections").then(module => ({ default: module.ConnectionsPage })));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Suspense fallback={<DeferredPageSkeleton page="home" />}><Home /></Suspense>} />
          <Route path="/timeline" element={<Suspense fallback={<DeferredPageSkeleton page="timeline" />}><TimelinePage /></Suspense>} />
          <Route path="/database" element={<Suspense fallback={<DeferredPageSkeleton page="database" />}><DatabasePage /></Suspense>} />
          <Route path="/characters" element={<Suspense fallback={<DeferredPageSkeleton page="characters" />}><CharactersPage /></Suspense>} />
          <Route path="/connections" element={<Suspense fallback={<DeferredPageSkeleton page="connections" />}><ConnectionsPage /></Suspense>} />
          <Route path="/status" element={<Navigate to="/database" replace />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
