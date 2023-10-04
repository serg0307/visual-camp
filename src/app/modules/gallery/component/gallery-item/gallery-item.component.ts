import { Component, HostListener, Input } from '@angular/core';
import { IGalleryItem } from 'src/app/interfaces/gallery-item';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent {
  @Input() item: IGalleryItem = <IGalleryItem>{};
  @HostListener('mousemove',['$event'])

  onMouseMove(e: any) {
    /*var amountMovedX = (e.clientX * -0.1 / 8);
    var amountMovedY = (e.clientY * -0.1 / 8);
    const x = e.target;

    var i;
    console.log(x);
    x.style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)' /** */
  }

}
