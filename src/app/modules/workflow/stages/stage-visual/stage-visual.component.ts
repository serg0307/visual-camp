import { Component, Input } from '@angular/core';
import { WorkflowStage, WorkflowItem } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-stage-visual',
  templateUrl: './stage-visual.component.html',
  styleUrls: ['./stage-visual.component.scss']
})
export class StageVisualComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  constructor(private workflow: WorkflowService) {}
  select(item: WorkflowItem) {
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
  }
}
