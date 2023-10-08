import { Component, HostListener, Input } from '@angular/core';
import { IGalleryItem } from 'src/app/interfaces/gallery-item';
@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent {
  @Input() item: IGalleryItem = <IGalleryItem>{};
  /*@HostListener('mousemove',['$event'])

  onMouseMove(e: any) {
    var amountMovedX = (e.clientX * -0.1 / 4);
    var amountMovedY = (e.clientY * -0.1 / 4);
    const x = e.target;
    if (x.tagName == 'IMG') {

      var ix = e.clientX - x.x - x.clientWidth/2;
      var iy = e.clientY - x.y - x.clientHeight/2;
      console.log(x);
      console.log(x.style);
      console.log(x.x, x.y);
      console.log(x.clientWidth, x.clientHeight);
      console.log(e.clientX - x.x, ix/10);
      console.log(e.clientY - x.y, iy/10);

      x.style['margin-left'] = ix;
      x.transition = 'cubic-bezier(0,0,0,1)'
      //x.style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'

    }
  }/** */

}
