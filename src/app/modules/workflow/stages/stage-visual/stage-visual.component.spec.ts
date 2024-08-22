import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageVisualComponent } from './stage-visual.component';

describe('StageVisualComponent', () => {
  let component: StageVisualComponent;
  let fixture: ComponentFixture<StageVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageVisualComponent]
    });
    fixture = TestBed.createComponent(StageVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
