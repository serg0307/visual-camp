import { Injectable } from '@angular/core';

import { JsonApiEntity } from './DrupalApi/classes/entity';
import { FilterOperator } from './DrupalApi/enum';
import { IUploadFile } from './DrupalApi/interfaces/upload-file';
import { JsonApiSettings } from './DrupalApi/jsonapi-settings';
import { JWT } from './DrupalApi/jwt';
import { EntityBundleInterface } from './DrupalApi/interfaces/entity-bundle';
import { DrupalClient } from './DrupalApi/drupal-client';
import { EntityInterface } from './DrupalApi/interfaces/entity';
import { JsonApiUser } from './DrupalApi/classes/user';
import { env_enum } from './DrupalApi/environment';



@Injectable({
  providedIn: 'root'
})
export class DrupalService {
  token: string = '';
  constructor() {}
  getBackendUrl () {
    return env_enum.BACKEND_URL;
  }
  async login(): Promise<boolean> {
    const userData = await JsonApiUser.Login({name: 'visualcamp', pass: ')Lcx7&8bjgFR8bE'});
    const client = new DrupalClient();
    client.authorize(userData.access_token);
    this.token = userData.access_token;
    return userData.access_token? true: false;
  }
  async getCollection(settings: JsonApiSettings): Promise<JsonApiEntity[]> {
    const client = new DrupalClient();
    return await client.LoadMultiple(settings);
  }

  async getOneByEntityId(entityBundle: EntityBundleInterface, id: number): Promise<JsonApiEntity> {
    const client = new DrupalClient();
    const settings = new JsonApiSettings();
    settings.entityBundle = entityBundle;
    settings.addFilter('uid.uid', id.toString(), FilterOperator.EQUAL);
    const entities = await client.LoadMultiple(settings);
    if (entities.length == 1) {
      const entity = <JsonApiEntity>entities.pop();
      return entity;
    }
    throw new Error(`Invalid id provided (${id})`);
  }

  async getOne(bundle: EntityBundleInterface, id: string): Promise<JsonApiEntity> {
    const client = new DrupalClient();

    const result = await client.Load(bundle, id);
    if (result?.id) {
      return result;
    }
    throw new Error(`Invalid id provided (${id})`);
  }
  async update(entity: JsonApiEntity, token: string = ''): Promise<JsonApiEntity> {
    if (!entity.id) {
      return <JsonApiEntity>{};
    }
    if (token == '') {
      token == this.token;
      console.log(this.token);
    }

    //const uidFieldValue = entity.get('uid');
    //const uid = uidFieldValue.data.meta.drupal_internal__target_id;
    const client = new DrupalClient();
    client.authorize(this.token);
    return await client.Update(entity);
  }
  async create(entity: JsonApiEntity, token: string): Promise<JsonApiEntity> {
    const client = new DrupalClient();
    client.authorize(JWT.refineToken(token));
    entity.id = '';
    return await client.Create(entity);
  }
  async archive(entity: JsonApiEntity, token: string): Promise<JsonApiEntity> {
    const client = new DrupalClient();
    client.authorize(JWT.refineToken(token));
    entity.attributes.field_archived = true;
    return await this.update(entity, token);
  }



  async uploadFile(uploadDto: IUploadFile, token: string): Promise<EntityInterface> {
    const client = new DrupalClient;
    client.authorize(token);
    const result = await client.UploadFile(uploadDto);
    const entity = new JsonApiEntity();
    entity.build(result);
    return entity;
  }
}
