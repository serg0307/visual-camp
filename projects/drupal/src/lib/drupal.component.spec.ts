import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrupalComponent } from './drupal.component';

describe('DrupalComponent', () => {
  let component: DrupalComponent;
  let fixture: ComponentFixture<DrupalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrupalComponent]
    });
    fixture = TestBed.createComponent(DrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
