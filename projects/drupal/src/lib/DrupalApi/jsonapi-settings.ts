
import { v4 as uuidv4 } from 'uuid';

import { FilterOperator, FilterType } from './enum';
import { DrupalService } from '../drupal.service';
import { JsonApiFilter } from './classes/JsonapiSettings/filter';
import { JsonApiFilterGroup } from './classes/JsonapiSettings/filter-group';
import { EntityBundleInterface } from './interfaces/entity-bundle';

export class JsonApiSettings {
  entityBundle: EntityBundleInterface = <EntityBundleInterface>{};
  filter: JsonApiFilter[] = [];
  filterGroups: JsonApiFilterGroup[] = [];
  include: string[] = [];
  pageOffset: number = 0;
  pageLimit: number = 50;
  sort: string = '';
  constructor() {
    this.reset();
  }
  public addInclude(field: string): void {
    this.include.push(field);
  }
  public addFilterOld(filter: JsonApiFilter): void {
    this.filter.push(filter);
  }
  public createFilterGroup(identifier: string, type: FilterType, memberOf: string): JsonApiFilterGroup {

    const filterGroup = new JsonApiFilterGroup({
      identifier: identifier,
      type: type,
      children: []
    });

    if (memberOf)
      filterGroup.memberOf = memberOf;

    return filterGroup;
  }
  public addFilterGroup(filterGroup: JsonApiFilterGroup) {

    this.filterGroups.push(filterGroup);
  }
  public addFilter(entityField: string, value: string, operator: FilterOperator, group?: JsonApiFilterGroup): void {
    const filter = new JsonApiFilter({
      identifier: uuidv4(),
      path: entityField,
      value: value,
      operator: operator,

    });

    if (group) {
      filter.memberOf = group.identifier;
      group.children.push(filter);

    } else {

      this.filter.push(filter);
    }
  }
  public reset(): void {
    this.filter = [];
    this.filterGroups = [];
    this.include = [];
    this.pageOffset = 0;
    this.pageLimit = 50;
    this.sort = '';
  }
  public buildUrlParameters(): string {
    const result = [];
    this.filterGroups.forEach(f => {
      result.push(f.query());
    });
    this.filter.forEach(f => {
      result.push(f.query());
    });
    if (this.include.length > 0) {
      result.push(`include=${this.include.join(',')}`);
    }
    return `${result.join('&')}&page[limit]=${this.pageLimit}&page[offset]=${this.pageOffset}${this.sort ? '&sort='+this.sort: ''}`;
  }
  buildUrl(): string {
    return `${this.entityBundle.type}/${this.entityBundle.bundle}?${this.buildUrlParameters()}`;
  }
}
