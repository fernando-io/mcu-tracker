import type { TabId } from "../../types";

const tabs: { id: TabId; label: string }[] = [
  { id: "maratona", label: "Maratona" },
  { id: "arquivo", label: "S.H.I.E.L.D. Database" },
  { id: "conexoes", label: "Conexões" },
  { id: "status", label: "Onde estamos?" },
  { id: "conquistas", label: "Conquistas" },
  { id: "ranking", label: "Meu ranking" },
];

interface TabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <nav className="navtabs" aria-label="Seções">
      {tabs.map(tab => (
        <button key={tab.id} className={`tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}