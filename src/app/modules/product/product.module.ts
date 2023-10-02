import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './component/product-page/product-page.component';

import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ProductModule { }
