import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { FrontPageComponent } from './shared/front-page/front-page.component';
import { ProductPageComponent } from './modules/product/component/product-page/product-page.component';
import { ContactsPageComponent } from './shared/contacts-page/contacts-page.component';
import { WorkflowPageComponent } from './modules/workflow/pages/workflow-page/workflow-page.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'workflows/:id', component: WorkflowPageComponent},
  {path: 'contacts', component: ContactsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
