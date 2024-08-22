import { Component, Input } from '@angular/core';

import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  @Input() id: string = '';
  product: IProduct[] = [];
  title = '';
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getOne(this.id).then((data: IProduct[]) => {
      this.product = data;
      console.log(data[0]);
      this.title = data[0]?.project.title;
    }, function(error) {
      console.log(error);
    });
  }
  download_(item: IProduct): void {
    if (item.downloadLink) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', item.downloadLink);
      link.setAttribute('download', `products.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
  download(url: string) { ;
    window.open(url);
  }
}
