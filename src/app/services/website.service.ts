import { Injectable } from '@angular/core';
import { env_enum } from 'projects/drupal/src/lib/DrupalApi/environment';
import { JsonApiSettings } from 'projects/drupal/src/lib/DrupalApi/jsonapi-settings';
import { IGalleryItem } from '../interfaces/gallery-item';
import { IWebsite } from '../interfaces/website';
import { DrupalService } from 'projects/drupal/src/public-api';
import { FilterOperator } from 'projects/drupal/src/lib/DrupalApi/enum';
import { StylesEnum } from '../helpers/styles-enum';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private drupal: DrupalService) { }
  async getOne(id: string): Promise<IWebsite> {
    const item: IWebsite = {
      id: '',
      title: '',
      logoUrl: '',
      backendUrl: ''
    }
    const settings = new JsonApiSettings();
    settings.entityBundle = { type: 'node', bundle: 'website' };
    settings.include = ['field_image'];
    settings.addFilter('nid', id, FilterOperator.EQUAL);
    const res = await this.drupal.getCollection(settings);
    res.forEach(element => {
      item.id = element.get('drupal_internal__nid');
      item.title = element.get('title');
      item.backendUrl = element.get('field_backend_url');
      const bg = element.getImages('field_image'); // get relationship object
      bg.forEach(imageEntity => {
        const bgEntity = element.findInIncluded(imageEntity.id); // find included entity
        const styles = bgEntity.get('image_style_uri');
        item.logoUrl = styles[StylesEnum.LOGO];

      });
      item.email = element.get('field_email');
      item.phone = element.get('field_phone');
    });
    return item;
  }

}
