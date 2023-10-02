export interface EntityRelationshipInterface {
  data: RelationshipInterface | RelationshipInterface[]
}
export interface RelationshipInterface {
  id: string;
  type: string;
}
