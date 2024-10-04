import { Component, Input } from '@angular/core';
import { WorkflowStage } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.scss']
})
export class StageHeaderComponent {
  @Input() current = false;
  @Input() declined = false;
  @Input() iconUrl = '';
  @Input() stage: WorkflowStage = <WorkflowStage>{};
}
