import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './component/product-page/product-page.component';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
})
export class ProductModule { }
