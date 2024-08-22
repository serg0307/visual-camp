import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAudioComponent } from './stage-audio.component';

describe('StageAudioComponent', () => {
  let component: StageAudioComponent;
  let fixture: ComponentFixture<StageAudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageAudioComponent]
    });
    fixture = TestBed.createComponent(StageAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
