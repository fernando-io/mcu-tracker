import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { AchievementsPage } from "./pages/Achievements/Achievements";
import { CharacterPage } from "./pages/Character/Character";
import { CharactersPage } from "./pages/Characters/Characters";
import { ConnectionsPage } from "./pages/Connections/Connections";
import { DatabasePage } from "./pages/Database/Database";
import { Home } from "./pages/Home/Home";
import { RankingPage } from "./pages/Ranking/Ranking";
import { StatusPage } from "./pages/Status/Status";
import { TimelinePage } from "./pages/Timeline/Timeline";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
