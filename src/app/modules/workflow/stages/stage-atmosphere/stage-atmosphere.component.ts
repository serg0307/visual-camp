import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-atmosphere',
  templateUrl: './stage-atmosphere.component.html',
  styleUrls: ['./stage-atmosphere.component.scss']
})
export class StageAtmosphereComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  select(item: WorkflowItem) {
    this.stage.result = [item];
    this.stage.completed = true;
  }
}
