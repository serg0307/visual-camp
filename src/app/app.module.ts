import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './shared/front-page/front-page.component';
import { MainMenuComponent } from './shared/main-menu/main-menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

import { GalleryModule } from './modules/gallery/gallery.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsPageComponent } from './shared/contacts-page/contacts-page.component';
import { ProductModule } from './modules/product/product.module';
import { BrandingComponent } from './shared/branding/branding.component';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SiteDisabledComponent } from './shared/site-disabled/site-disabled.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    MainMenuComponent,
    FooterComponent,
    ToolbarComponent,
    ContactsPageComponent,
    BrandingComponent,
    SiteDisabledComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GalleryModule,
    BrowserAnimationsModule
  ],
  exports: [
    NotFoundComponent,
    SiteDisabledComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


