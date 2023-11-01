
import { EntityAttributesInterface } from "../interfaces/JsonapiEntity/entity-attributes";
import { EntityFieldTextInterface } from "../interfaces/JsonapiEntity/entity-field-text";
import { EntityRelationshipInterface, RelationshipInterface } from "../interfaces/JsonapiEntity/relationship";
import { EntityInterface } from "../interfaces/entity";
import { EntityBundleInterface } from "../interfaces/entity-bundle";
import { JsonApiSettings } from "../jsonapi-settings";


/**
 * @param {EntityBundles} bundle - endpoint ULR string '{entityType}/{entityBundle}' like 'node/article'
 */
export class JsonApiEntity implements EntityInterface {
  type: string = '';
  id: string;
  attributes: EntityAttributesInterface;
  relationships: {
    [key: string]: EntityRelationshipInterface;
  };
  included?: JsonApiEntity[];
  bundle: EntityBundleInterface = <EntityBundleInterface>{};
  querySettings: JsonApiSettings = new JsonApiSettings();
  constructor() {
    this.attributes = <EntityAttributesInterface>{};
    this.relationships = {};
    this.included = [];
    this.id = '';
  }
  /**
   * Fill Entity fields
   * @param {EntityInterface} entity
   */
  build(entity: EntityInterface): void {
    if (!entity) return;
    const arr = entity.type.split('--');
    this.bundle = {
      type: arr[0],
      bundle: arr[1]
    }
    Object.assign(this, entity);
    Object.assign(this.attributes
      , entity.attributes);
  }
  getRelationshipData(): RelationshipInterface {
    return {
      id: this.id,
      type: `${this.bundle.type}--${this.bundle.bundle}`
    }
  }
  /**
   * Get field value
   * @param {string} fieldName
   * @returns {string | EntityRelationshipInterface}
   */
  get(fieldName: string) {
    if (this.relationships[fieldName] !== undefined) {
      return this.relationships[fieldName];
    }
    const attributes = (this.attributes as any);
    if (attributes[fieldName] !== undefined) {
      return attributes[fieldName];
    }
    return '';
  }
  getImages(fieldName: string): JsonApiEntity[] {
    if (this.relationships[fieldName] == undefined) {
      return [];
    }
    const result = [];
    const field = this.relationships[fieldName];
    const data = field.data;
    if (Array.isArray(data)) {
      data.forEach(element => {
        result.push(this.buildImageEntity(element));
      });
    } else {
      result.push(this.buildImageEntity(data));
    }
    return result;
  }
  buildImageEntity(data: any): JsonApiEntity {
    let entity = new JsonApiEntity();
    entity.build(data);
    return data;
  }
  setTextFieldAttribute(attributeName: string, value: EntityFieldTextInterface): void {
    (this.attributes as any)[attributeName] = value;
  }
  /**
   * Set entity attribute field
   * @param {string} attributeName
   * @param {string} value
   */
  setAttribute(attributeName: string, value: string): void {
    (this.attributes as any)[attributeName] = value;
  }
  /**
   * Set entity relationship field
   * @param {string} fieldName
   * @param {EntityRelationshipInterface} fieldValue
   */
  setRelationship(fieldName: string, fieldValue: EntityRelationshipInterface): void {
    this.relationships[fieldName] = fieldValue;
  }
  /**
   * Find entity by Drupal internal uuid in this.included
   * @param {string} id
   * @returns {JsonApiEntity}
   */
  findInIncluded(id: string): JsonApiEntity {
      return <JsonApiEntity>this.included?.find(x => x.id === id);
  }
  buildBackendUrl(): string {
    if (this.id !== null) {
      return `${this.type.replace('--', '/')}/${this.id}`;
    }
    return `${this.type.replace('--', '/')}`;
  }
  setType(bundle: EntityBundleInterface): void {
    this.type = `${bundle.type}--${bundle.bundle}`
  }
}


