import { Component, inject } from '@angular/core';
import { Workflow, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-workflow-page',
  templateUrl: './workflow-page.component.html',
  styleUrls: ['./workflow-page.component.scss']
})
export class WorkflowPageComponent {
  workflow: Workflow = <Workflow>{};
  private workflowService = inject(WorkflowService);
  ngOnInit(): void {
    this.workflow = this.workflowService.getWorkflow();
  }
  yes(stage: WorkflowStage) {
    stage.completed = true;
  }
  no(stage: WorkflowStage) {

  }
  isCurrent(i: number): boolean {
    const stage = this.workflow.stages[i];
    if (stage.completed) {
      return false;
    }
    if (i > 0) {
      return this.workflow.stages[i-1]?.completed;
    }
    return true;
  }
}
