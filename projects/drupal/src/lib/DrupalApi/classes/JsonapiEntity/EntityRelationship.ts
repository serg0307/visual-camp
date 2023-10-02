import { RelationshipInterface } from "../../interfaces/JsonapiEntity/relationship";
export class EntityRelationship implements RelationshipInterface {
  id: string = '';
  type: string = '';
  meta: { drupal_internal__target_id: number; } = {drupal_internal__target_id:0};
}
