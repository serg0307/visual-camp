import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { IWebsite } from 'src/app/interfaces/website';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  website: IWebsite = <IWebsite>{};
  constructor(private app: AppComponent) {}
  ngOnInit(): void {

  }
  getLogo(): string {
    return this.app.website.logoUrl;
  }
}
