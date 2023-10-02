import { FilterType } from "../../enum";
import { JsonApiFilter } from "../../classes/JsonapiSettings/filter";


export interface FilterGroupInterface {
  identifier: string;
  type: FilterType;
  children: JsonApiFilter[];
  memberOf?: string;
}
