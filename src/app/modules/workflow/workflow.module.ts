import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowPageComponent } from './pages/workflow-page/workflow-page.component';
import { ImageBlockComponent } from './UI/image-block/image-block.component';
import { SoundBlockComponent } from './UI/sound-block/sound-block.component';
import { VideoBlockComponent } from './UI/video-block/video-block.component';
import { FormsModule } from '@angular/forms';
import { StageAudioComponent } from './stages/stage-audio/stage-audio.component';
import { StageAtmosphereComponent } from './stages/stage-atmosphere/stage-atmosphere.component';
import { StageAnimaticComponent } from './stages/stage-animatic/stage-animatic.component';
import { StageVisualComponent } from './stages/stage-visual/stage-visual.component';
import { ProgressSidebarComponent } from './components/progress-sidebar/progress-sidebar.component';

@NgModule({
  declarations: [
    WorkflowPageComponent,
    ImageBlockComponent,
    SoundBlockComponent,
    VideoBlockComponent,
    StageAudioComponent,
    StageAtmosphereComponent,
    StageAnimaticComponent,
    StageVisualComponent,
    ProgressSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class WorkflowModule { }
