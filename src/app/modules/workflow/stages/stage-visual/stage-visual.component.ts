import { Component, Input } from '@angular/core';
import { WorkflowStage, WorkflowItem } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-visual',
  templateUrl: './stage-visual.component.html',
  styleUrls: ['./stage-visual.component.scss']
})
export class StageVisualComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};

  select(item: WorkflowItem) {
    this.stage.result = [item];
    if (this.stage.result.length == this.stage.items.length) {
      this.stage.completed = true;
    }
  }
}
