import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  getOne(id:number):ProductInterface {
    const prod:ProductInterface = {
      id: '1',
      title: 'MAIN PRODUCT',
      contentUrl: 'https://estate.yakogo.kh.ua/sites/default/files/styles/scale_crop_1400x800/public/2023-10/new-york-city-street-photography_a2VraW6UmZqaraWkpJRqaWprrWhla2k%5B1%5D.jpg?itok=Au4RSU2y',
      description: 'This a good example of Building visual with trees and nice exterior parts. Cars Included, sunlight and other lights.',
      images: [],
      downloadLink: ''
    };
    return prod;
  }
}
