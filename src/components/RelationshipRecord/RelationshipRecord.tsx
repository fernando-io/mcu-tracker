import type { RelationshipRecordViewModel } from "../../viewModels/characters";

interface RelationshipRecordProps {
  model: RelationshipRecordViewModel;
}

export function RelationshipRecord({ model }: RelationshipRecordProps) {
  return (
    <div className="dossier-record relationship-record intel-link">
      <span>INT</span>
      <div><h4>{model.targetName}</h4><p>{model.relationshipLabel}</p></div>
    </div>
  );
}