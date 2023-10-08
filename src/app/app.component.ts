import { Component } from '@angular/core';
import { WebsiteService } from './services/website.service';
import { IWebsite } from './interfaces/website';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Visual Camp';
  loader = true;
  public website: IWebsite = <IWebsite>{};
  constructor(private websiteService: WebsiteService) {}
  ngOnInit(): void {
    this.websiteService.getOne('20').then(data => {
      console.log(data);
      this.website = data;
    });
    setTimeout(() => {
      this.loader = false;
    }, 4000);
  }
}
