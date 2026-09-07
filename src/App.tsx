import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CharacterPage } from "./pages/Character/Character";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
