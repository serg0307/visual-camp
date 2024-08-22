import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundBlockComponent } from './sound-block.component';

describe('SoundBlockComponent', () => {
  let component: SoundBlockComponent;
  let fixture: ComponentFixture<SoundBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoundBlockComponent]
    });
    fixture = TestBed.createComponent(SoundBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
