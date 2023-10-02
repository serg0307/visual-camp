import { Component, Input } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  @Input() id: string = '';
  product: ProductInterface = <ProductInterface>{};
  constructor(private productService:ProductService) {}
  ngOnInit(): void {
    this.product = this.productService.getOne(1);
    console.log(this.product);
  }
}
