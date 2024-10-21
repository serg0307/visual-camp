import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-stage-animatic',
  templateUrl: './stage-animatic.component.html',
  styleUrls: ['./stage-animatic.component.scss']
})
export class StageAnimaticComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  constructor(private workflow: WorkflowService) {}
  select(item: WorkflowItem) {
    this.setResult(item);
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
    window.scrollTo(0,300);
  }
  setResult(item: WorkflowItem) {
    this.stage.result = [item];
  }
}
