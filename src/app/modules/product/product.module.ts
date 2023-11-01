import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './component/product-page/product-page.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppModule
  ],
})
export class ProductModule { }
