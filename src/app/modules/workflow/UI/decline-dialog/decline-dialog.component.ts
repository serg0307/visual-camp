import { Component, Input } from '@angular/core';
import { WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-decline-dialog',
  templateUrl: './decline-dialog.component.html',
  styleUrls: ['./decline-dialog.component.scss']
})
export class DeclineDialogComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  constructor(private workflow: WorkflowService) {}
  decline() {

    this.stage.declined = true;
    this.workflow.saveStage(this.stage);
  }
}
