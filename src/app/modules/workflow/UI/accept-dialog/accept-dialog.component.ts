import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.scss']
})
export class AcceptDialogComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  @Input() imageIndex: number = -1;
  constructor(private workflow: WorkflowService,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {}
  accept() {
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
    window.scrollTo(0,300);
  }
  cancel() {
    if (!this.stage.isApproveStage) {
      this.stage.result = [];
    }
  }
  getAtmosphereImageIndex(item: WorkflowItem) {
    const i = this.stage.items.findIndex((e) => {return e.id == item.id});
    return i;
  }
}
