import { FilterGroupInterface } from "../../interfaces/JsonapiSettings/filter-group";
import { FilterType } from "../../enum"
import { JsonApiFilter } from "./filter";

export class JsonApiFilterGroup implements FilterGroupInterface{

  constructor(filter: FilterGroupInterface) {
    Object.assign(this, filter);
  }
  identifier: string = '';
  type: FilterType = FilterType.AND;
  children: JsonApiFilter[] = [];
  memberOf?: string;
  query() {
    return ([
      `filter[${this.identifier}][group][conjunction]=${this.type}`,
      (this.memberOf ? `filter[${this.identifier}][group][memberOf]=${this.memberOf}` : ''),
      ...this.children.map(child => child.query()),
    ])
  }

}
