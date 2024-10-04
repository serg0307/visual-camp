import { Component, Input } from '@angular/core';
import { WorkflowStage } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent {
  @Input() stage:WorkflowStage = <WorkflowStage> {};
}
