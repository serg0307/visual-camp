import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAtmosphereComponent } from './stage-atmosphere.component';

describe('StageAtmosphereComponent', () => {
  let component: StageAtmosphereComponent;
  let fixture: ComponentFixture<StageAtmosphereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageAtmosphereComponent]
    });
    fixture = TestBed.createComponent(StageAtmosphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
