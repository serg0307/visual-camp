import { Component, Input } from '@angular/core';
import { IGalleryItem } from 'src/app/interfaces/gallery-item';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent {
  @Input() item: IGalleryItem = <IGalleryItem>{};
}
