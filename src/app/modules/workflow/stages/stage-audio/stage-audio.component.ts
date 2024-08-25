import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-audio',
  templateUrl: './stage-audio.component.html',
  styleUrls: ['./stage-audio.component.scss']
})
export class StageAudioComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  select(item: WorkflowItem) {
    this.stage.result = [item];
    this.stage.completed = true;
  }
}
