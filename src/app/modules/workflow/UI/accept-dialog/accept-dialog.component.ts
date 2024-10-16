import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.scss']
})
export class AcceptDialogComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  constructor(private workflow: WorkflowService) {}
  accept() {
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
  }
  cancel() {
    if (!this.stage.isApproveStage) {
      this.stage.result = [];
    }
  }
}
