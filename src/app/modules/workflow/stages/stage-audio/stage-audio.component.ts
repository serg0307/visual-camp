import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-stage-audio',
  templateUrl: './stage-audio.component.html',
  styleUrls: ['./stage-audio.component.scss']
})
export class StageAudioComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  constructor(private workflow: WorkflowService) {}
  select(item: WorkflowItem) {
    this.setResult(item);
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
  }
  setResult(item: WorkflowItem) {
    this.stage.result = [item];
  }
}
