import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { IWebsite } from 'src/app/interfaces/website';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  website: IWebsite = <IWebsite>{};
  constructor(private app: AppComponent) {}
  ngOnInit(): void {

  }
  getLogo(): string {
    return this.app.website.logoUrl;
  }
  getPhone():string {
    return <string>this.app.website.phone;
  }
  getMail():string {
    return <string>this.app.website.email;
  }
  getTitle(): string{
    return this.app.website.title;
  }
}
