import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { FilterOperator } from 'projects/drupal/src/lib/DrupalApi/enum';
import { JsonApiSettings } from 'projects/drupal/src/lib/DrupalApi/jsonapi-settings';
import { DrupalService } from 'projects/drupal/src/public-api';
import { StylesEnum } from '../helpers/styles-enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private drupal: DrupalService
  ) { }
  async getOne(id: string): Promise<IProduct[]> {

    const settings = new JsonApiSettings();
    settings.entityBundle = { type: 'node', bundle: 'project_item' };
    settings.include = ['field_project_image', 'field_download'];
    settings.addFilter('field_project.id', id, FilterOperator.EQUAL);
    const result:IProduct[] = [];
    const res = await this.drupal.getCollection(settings);
    res.forEach(element => {
      const item: IProduct = {
        id: '',
        title: '',
        contentUrl: '',
        description: '',
        content: []
      }
      item.id = element.get('drupal_internal__nid');
      item.title = element.get('title');
      item.description = element.get('body')?.processed;


      const bg = element.getImages('field_project_image'); // get relationship object
      console.log('images');
      bg.forEach(imageEntity => {
        const bgEntity = element.findInIncluded(imageEntity.id); // find included entity
        const styles = bgEntity.get('image_style_uri');
        console.log(imageEntity, styles);
        if (styles) {
          item.contentUrl = styles[StylesEnum.PRODUCT];
          const image = {
            id: imageEntity.id,
            url: item.contentUrl
          }
          item.content.push(image);
        }
        console.log(item.content);
      });
      const dl = element.getImages('field_download')?.pop(); // get relationship object

      if (dl) {
        const dlEntity = element.findInIncluded(dl.id);
        item.fileName = dlEntity.get('filename');
        item.mimeType = dlEntity.get('filemime');
        item.downloadLink = this.drupal.getBackendUrl() + dlEntity.get('uri')?.url;
      }
      result.push(item);
    });

    return result;
  }
}
