import {EntityFieldTextInterface} from "./entity-field-text";

export interface EntityAttributesInterface {
  id: string;
  title?: string;
  field_archived?: boolean;
  body?: EntityFieldTextInterface;
  comment_body?: EntityFieldTextInterface;
}
