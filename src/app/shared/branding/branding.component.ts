import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { IWebsite } from 'src/app/interfaces/website';


@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent {
  @Input() scheme: string = 'dark';
  @Input() isHeader: boolean = true;
  website: IWebsite = <IWebsite>{};
  constructor(private app: AppComponent) {}
  ngOnInit(): void {

  }
  getLogo(): string {
    return this.app.website.logoUrl;
  }
  getTitle(): string {
    return this.app.website.title;
  }
}
