import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBlockComponent } from './video-block.component';

describe('VideoBlockComponent', () => {
  let component: VideoBlockComponent;
  let fixture: ComponentFixture<VideoBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoBlockComponent]
    });
    fixture = TestBed.createComponent(VideoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
