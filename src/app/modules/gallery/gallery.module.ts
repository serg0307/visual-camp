import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './component/gallery-list/gallery-list.component';
import { GalleryItemComponent } from './component/gallery-item/gallery-item.component';



@NgModule({
  declarations: [
    GalleryListComponent,
    GalleryItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GalleryListComponent,
    GalleryItemComponent
  ],
})
export class GalleryModule { }
