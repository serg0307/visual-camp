import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDisabledComponent } from './site-disabled.component';

describe('SiteDisabledComponent', () => {
  let component: SiteDisabledComponent;
  let fixture: ComponentFixture<SiteDisabledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteDisabledComponent]
    });
    fixture = TestBed.createComponent(SiteDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
