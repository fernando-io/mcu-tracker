import { ConnectionGraph } from "../../components/ConnectionGraph/ConnectionGraph";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function ConnectionsPage() {
  const connections = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <div className="card connections-wrap"><ConnectionGraph connections={connections.visibleConnections} /></div>
    </main>
  );
}
