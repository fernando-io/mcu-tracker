import { CharacterCard } from "../../components/CharacterCard/CharacterCard";
import { useHomeViewModel } from "../../hooks/useHomeViewModel";

export function CharactersPage() {
  const characters = useHomeViewModel({ filter: "all", query: "" });

  return (
    <main className="wrap page-content">
      <div className="db-grid">{characters.characterCardModels.map((model, index) => <CharacterCard key={model.isUnlocked ? model.id : `classified-${index}`} model={model} />)}</div>
    </main>
  );
}
