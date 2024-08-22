import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSidebarComponent } from './progress-sidebar.component';

describe('ProgressSidebarComponent', () => {
  let component: ProgressSidebarComponent;
  let fixture: ComponentFixture<ProgressSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressSidebarComponent]
    });
    fixture = TestBed.createComponent(ProgressSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
