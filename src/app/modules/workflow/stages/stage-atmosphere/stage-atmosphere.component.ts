import { Component, Input } from '@angular/core';
import { WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-stage-atmosphere',
  templateUrl: './stage-atmosphere.component.html',
  styleUrls: ['./stage-atmosphere.component.scss']
})
export class StageAtmosphereComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  result: WorkflowItem[] = [];
  constructor(private workflow: WorkflowService) {}
  select(item: WorkflowItem) {
    const found = this.result.find((el) => el.id == item.id);
    if (!found) {
      this.result.push(item);
    } else {
      this.result = this.result.filter(el => el.id == item.id);
    }
    item.selected = !item.selected;
    //this.setResult(item);
    //this.stage.completed = true;
  }
  save() {
    console.log('save');
    this.stage.result = this.result;
    console.log(this.stage.result);
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
  }
}
