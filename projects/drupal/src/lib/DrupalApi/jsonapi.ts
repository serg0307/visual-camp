/*import {JsonApiSettings} from './jsonapi-settings';
import axios from 'axios';
import {JWT} from './jwt';
import {AuthTokenError, FilterOperator} from './enum';
import { DrupalService } from '../drupal.service';
import {JsonApiEntity} from './classes/entity';
import {IUploadFile} from "./interfaces/upload-file";
import {EntityInterface} from "./interfaces/entity";
import { EntityBundleInterface } from './interfaces/entity-bundle';

export class JsonApi {

  static backendUrl = 'https://new.chatnovel.club';
  static apiUrl = `${JsonApi.backendUrl}/jsonapi`;

  static async getCollection(settings: JsonApiSettings): Promise<JsonApiEntity[]> {
    const client = new DrupalService();
    return await client.LoadMultiple(settings);
  }

  static async getOneByEntityId(entityBundle: EntityBundleInterface, id: number): Promise<JsonApiEntity> {
    const client = new DrupalService();
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

  static async getOne(bundle: EntityBundleInterface, id: string): Promise<JsonApiEntity> {
    const client = new DrupalService();

    const result = await client.Load(bundle, id);
    if (result?.id) {
      return result;
    }
    throw new Error(`Invalid id provided (${id})`);
  }
  static async update(entity: JsonApiEntity, token: string): Promise<JsonApiEntity> {
    if (!entity.id) {
      return <JsonApiEntity>{};
    }
    const uidFieldValue = entity.get('uid');
    const uid = uidFieldValue.data.meta.drupal_internal__target_id;
    if (uid != JWT.getUidFromToken(token)) {
      throw new Error('Can edit own material only.');
    }
    const client = new DrupalService();
    client.authorize(JWT.refineToken(token));
    return await client.Update(entity);
  }
  static async create(entity: JsonApiEntity, token: string): Promise<JsonApiEntity> {
    const client = new DrupalService();
    client.authorize(JWT.refineToken(token));
    entity.id = '';
    return await client.Create(entity);
  }
  static async archive(entity: JsonApiEntity, token: string): Promise<JsonApiEntity> {
    const client = new DrupalService();
    client.authorize(JWT.refineToken(token));
    entity.attributes.field_archived = true;
    return await this.update(entity, token);
  }

  static async refreshToken(token: string): Promise<void> {
    return await axios
      .get(`${JsonApi.backendUrl}/jwt/token`, {
        headers: {
          Authorization: `Bearer ${JWT.refineToken(token)}`
        }
      })
      .catch(() => {
        throw new Error(AuthTokenError.INVALID_TOKEN);
      })
      .then((res) => {
        return res.data;
      });
  }

  static async uploadFile(uploadDto: IUploadFile, token: string): Promise<EntityInterface> {
    const client = new DrupalService;
    client.authorize(token);
    const result = await client.UploadFile(uploadDto);
    const entity = new JsonApiEntity();
    entity.build(result);
    return entity;
  }

}


/** */
