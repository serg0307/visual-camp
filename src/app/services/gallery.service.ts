import { Injectable } from '@angular/core';
import { IGalleryItem } from '../interfaces/gallery-item';
import { DrupalService } from 'projects/drupal/src/public-api';
import { JsonApiSettings } from 'projects/drupal/src/lib/DrupalApi/jsonapi-settings';
import { env_enum } from 'projects/drupal/src/lib/DrupalApi/environment';
import { StylesEnum } from '../helpers/styles-enum';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  gallery: IGalleryItem[] = [];
  constructor(private drupal: DrupalService) { }
  getGalleryList(): IGalleryItem[] {
    return this.gallery;
  }
  async getList(): Promise<IGalleryItem[]> {

    const result: IGalleryItem[] = [];
    const settings = new JsonApiSettings();
    settings.entityBundle = { type: 'node', bundle: 'article' };
    settings.include = ['field_image', 'field_video'];
    const res = await this.drupal.getCollection(settings);
    res.forEach(element => {
      const item: IGalleryItem = {
        id: '',
        title: '',
        contentUrl: '',
        description: '',
        images: []
      }
      item.id = element.get('drupal_internal__nid');
      item.title = element.get('title');
      item.description = element.get('body')?.processed;
      const bg = element.getImages('field_image'); // get relationship object
      bg.forEach(imageEntity => {
        const bgEntity = element.findInIncluded(imageEntity.id); // find included entity
        const styles = bgEntity.get('image_style_uri');
        if (styles && !item.contentUrl) {
          item.contentUrl = styles[StylesEnum.GALLERY];
        }
        item.images.push(styles[StylesEnum.GALLERY]);
      });
      const video = element.get('field_video'); // get relationship object
      if (video.data) {
        const videoEntity = element.findInIncluded(video.data.id); // find included entity
        console.log('video',videoEntity.get('uri')?.url);
        item.contentUrl = env_enum.BACKEND_URL+ videoEntity.get('uri')?.url;
        item.isVideo = true;
      }
      if (item.contentUrl) {
        result.push(item);
      }
    });
    return result;
  }
}
