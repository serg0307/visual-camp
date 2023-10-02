import { FilterType, FilterOperator } from "../../enum";


export interface FilterInterface {
  type?: FilterType;
  identifier: string;
  path: string;
  value: string;
  operator: FilterOperator;
  memberOf?: string;
}
