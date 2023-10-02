import axios, {AxiosHeaders, AxiosInstance, AxiosResponse} from 'axios';

import {AuthTokenError, EntityBundles, JsonApiHttpMethods} from './enum';
import {JsonApiEntity} from './classes/entity';
import {JsonApiSettings} from './jsonapi-settings';
import {JWT} from './jwt';
import {IUploadFile} from "./interfaces/upload-file";
import {env_enum} from "./environment";
import { EntityBundleInterface } from './interfaces/entity-bundle';


export class DrupalClient {
  static backendUrl = env_enum.BACKEND_URL;
  static apiUrl = `${DrupalClient.backendUrl}/${env_enum.PATH}`;
  private readonly axios: AxiosInstance = axios;
  private token: string = '';
  authorize(token: string) {
    this.token = JWT.refineToken(token);
  }
  /**
   * QUERY! All http queries are done with this function.
   * @param {JsonApiHttpMethods} method
   * @param {string} url
   * @param {JsonApiEntity} entity - Entity
   * @returns {AxiosResponse} axios response
   */
  public async query(method: JsonApiHttpMethods, url: string, entity?: JsonApiEntity): Promise<AxiosResponse> {
    const headers = new AxiosHeaders;
    headers.setContentType('application/vnd.api+json');
    if (this.token) {
      headers.setAuthorization('Bearer ' + this.token);
    }
    const query = {
      method: method,
      url: this.buildQueryUrl(url),
      data: {},
      headers: headers
    };
    if (method == JsonApiHttpMethods.POST || method == JsonApiHttpMethods.PATCH) {
      query.data = { data: entity };
    }
    return await this.axios(query).catch((e: any) => { throw new Error(e) });
  }
  /**
   * Upload file query
   * @param {IUploadFile} data
   * @returns {JsonApiEntity}
   */
  async UploadFile(data: IUploadFile): Promise<JsonApiEntity> {
    if (!this.token) {
      throw new Error(AuthTokenError.NO_TOKEN);
    }
    const headers = new AxiosHeaders;
    headers.setAuthorization('Bearer ' + this.token);
    headers.setContentType('application/octet-stream');
    headers.set('Content-Disposition', `file; filename="${data.originalname}"`)
    const url = `${data.entityType}/${data.entityBundle}/${data.entityUuid}/${data.entityFieldName}`;
    const result = await axios.post(this.buildQueryUrl(url), data.buffer, {headers: headers});
    const entity = new JsonApiEntity;
    let r = result.data.data;
    if (Array.isArray(result.data.data)) {
      r = result.data.data.pop();
    }
    entity.build(r);

    return entity;
  }
  /**
   * Load entity by uuid
   * @param {EntityBundleInterface} entityBundle
   * @param {string} uuid
   * @returns {JsonApiEntity}
   */
  async Load(entityBundle: EntityBundleInterface, uuid: string): Promise<JsonApiEntity> {

    const url = `${entityBundle.type}/${entityBundle.bundle}/${uuid}`;

    const query = {
      method: JsonApiHttpMethods.GET,
      url: this.buildQueryUrl(url)
    };

    const response = await this.axios(query);
    const entity = new JsonApiEntity();
    if (response.data.data == null) {
      return <JsonApiEntity>{};
    }
    entity.build(response.data.data);
    return entity;
  }
  /**
   * Load multiple entities
   * @param {JsonApiSettings} settings
   * @returns {JsonApiEntity[]}
   */
  async LoadMultiple(settings: JsonApiSettings): Promise<JsonApiEntity[]> {
    const url = settings.buildUrl();
    const query = {
      method: JsonApiHttpMethods.GET,
      url: this.buildQueryUrl(url)
    };
    const result: JsonApiEntity[] = [];
    const included: JsonApiEntity[] = [];
    const response = await this.axios(query);
    response.data?.included?.map((item: any) => {
      const entity = new JsonApiEntity();
      entity.build(item);
      included.push(entity);
    })

    response.data.data.map((item: any) => {
      const entity = new JsonApiEntity();
      entity.build(item);
      entity.included = included;
      entity.querySettings = settings;

      result.push(entity);
    })
    return result;
  }

  /**
   * Delete entity (MUST NOT be used with characters)
   * @param {JsonApiEntity} entity
   */
  async Delete(entity: JsonApiEntity): Promise<void> {
    entity.setType(entity.bundle);
    entity.attributes.field_archived = true;
    await this.query(JsonApiHttpMethods.DELETE, entity.buildBackendUrl());
  }
  /**
   * Update entity
   * @param {JsonApiEntity} entity
   * @returns {JsonApiEntity}
   */
  async Update(entity: JsonApiEntity): Promise<JsonApiEntity> {
    try {
      await this.query(JsonApiHttpMethods.PATCH, entity.buildBackendUrl(), entity);
      return entity;
    } catch {
      throw new Error('Cannot edit this for some reason.');
    }
  }
  /**
   * Create Entity
   * @param {JsonApiEntity} entity
   * @returns {JsonApiEntity}
   */
  async Create(entity: JsonApiEntity): Promise<JsonApiEntity> {
    const res = await this.query(JsonApiHttpMethods.POST, entity.buildBackendUrl(), entity);
    const e = new JsonApiEntity();
    e.build(res.data);
    return e;
  }
  async refreshToken(token: string): Promise<void> {
    return await axios
      .get(this.buildQueryUrl('jwt/token'), {
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
  private buildQueryUrl(uri: string): string {
    return `${env_enum.BACKEND_URL}/${env_enum.PATH}/${uri}`;
  }
}
