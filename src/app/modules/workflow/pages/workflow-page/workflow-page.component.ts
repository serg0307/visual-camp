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
    console.log(this.workflow);
  }
  yes(stage: WorkflowStage) {
    stage.completed = true;
  }
  no(stage: WorkflowStage) {

  }
  isCurrent(): string {
    if (!this.workflow.stages.audio.completed) {
      return 'audio';
    }
    if (!this.workflow.stages.atmosphere.completed) {
      return 'atmosphere';
    }
    if (!this.workflow.stages.animation.completed) {
      return 'animation';
    }
    return 'visual';
  }
}
