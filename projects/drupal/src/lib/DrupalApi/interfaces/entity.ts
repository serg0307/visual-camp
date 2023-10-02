import { EntityAttributesInterface } from "./JsonapiEntity/entity-attributes";
import { EntityRelationshipInterface } from "./JsonapiEntity/relationship";
import { EntityBundleInterface } from "./entity-bundle";

export interface EntityInterface {
  id: string;
  attributes: EntityAttributesInterface;
  relationships: {[key: string]: EntityRelationshipInterface};
  type: string;
  bundle: EntityBundleInterface;
}
