import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-animatic',
  templateUrl: './stage-animatic.component.html',
  styleUrls: ['./stage-animatic.component.scss']
})
export class StageAnimaticComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  select(item: WorkflowItem) {
    this.stage.result = [item];
    this.stage.completed = true;
  }
}
