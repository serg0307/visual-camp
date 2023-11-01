import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FrontPageComponent {
  text: string = '';
  constructor(public app: AppComponent) {
    console.log(this.app.website);
  }
  getText(): string {
    return this.app.website.frontPageText;
  }
}
