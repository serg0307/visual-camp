import { FilterInterface } from "../../interfaces/JsonapiSettings/filter";
import { FilterOperator, FilterType } from "../../enum"

export class JsonApiFilter implements FilterInterface {
  identifier: string = '';
  path: string = '';
  value: string = '';
  operator: FilterOperator = FilterOperator.EQUAL
  memberOf?: string;

  constructor(filter: FilterInterface) {
    Object.assign(this, filter);
  }
  query(): string {
    const result = [`filter[${this.identifier}][condition][path]=${this.path}`];

    if (this.operator !== FilterOperator.EQUAL) {
      result.push(`filter[${this.identifier}][condition][operator]=${this.operator}`);
    }
    if (this.memberOf)
      result.push(`filter[${this.identifier}][condition][memberOf]=${this.memberOf}`);
    result.push(`filter[${this.identifier}][condition][value]=${this.value}`);
    return result.join('&');
  }
}
