import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './shared/front-page/front-page.component';
import { ProductPageComponent } from './modules/product/component/product-page/product-page.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'product/:id', component:ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
