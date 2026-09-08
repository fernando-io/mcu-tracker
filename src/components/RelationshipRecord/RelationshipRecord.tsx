import { characters } from "../../data/characters";
import { organizationLabels, relationshipLabels } from "../../data/characterRelationships";
import { RelationshipTargetType, type CharacterRelationship } from "../../types";

interface RelationshipRecordProps {
  relationship: CharacterRelationship;
}

function targetName(relationship: CharacterRelationship) {
  if (relationship.targetType === RelationshipTargetType.Organization) {
    return organizationLabels[relationship.targetId] || relationship.targetId;
  }

  return characters.find(character => character.id === relationship.targetId)?.name || relationship.targetId;
}

export function RelationshipRecord({ relationship }: RelationshipRecordProps) {
  return (
    <div className="dossier-record relationship-record intel-link">
      <span>INT</span>
      <div><h4>{targetName(relationship)}</h4><p>{relationshipLabels[relationship.type]}</p></div>
    </div>
  );
}
