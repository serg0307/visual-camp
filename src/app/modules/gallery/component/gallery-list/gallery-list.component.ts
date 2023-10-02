import { Component } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { IGalleryItem } from 'src/app/interfaces/gallery-item';
import { GalleryService } from 'src/app/services/gallery.service';

type Columns = {
  one: IGalleryItem[],
  two: IGalleryItem[],
  three: IGalleryItem[]
}
@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})

export class GalleryListComponent {
  gallery: IGalleryItem[] = [];
  gallery$: Subscription = new Subscription();
  columns: Columns = <Columns>{
    one: [],
    two: [],
    three: []
  };
  constructor(private galleryService: GalleryService) {}
  ngOnInit(): void {
    this.galleryService.getList().then((data:IGalleryItem[]) => {
      console.log(data);
      this.gallery = data;
      this.buildColumns();
    });
  }
  buildColumns() {
    const itemsPerColumn = this.gallery.length / 3;
    this.gallery.forEach((element, index) => {
      console.log(index, itemsPerColumn, this.gallery.length);
      if (index< itemsPerColumn) {
        this.columns.one.push(element);
      } else if (index< itemsPerColumn *2) {
        this.columns.two.push(element);
      } else {
        this.columns.three.push(element);
      }
    });
  }
}
