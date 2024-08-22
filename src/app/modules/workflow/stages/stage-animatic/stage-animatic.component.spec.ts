import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAnimaticComponent } from './stage-animatic.component';

describe('StageAnimaticComponent', () => {
  let component: StageAnimaticComponent;
  let fixture: ComponentFixture<StageAnimaticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageAnimaticComponent]
    });
    fixture = TestBed.createComponent(StageAnimaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
