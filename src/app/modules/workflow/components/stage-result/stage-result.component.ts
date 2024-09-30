import { Component, Input } from '@angular/core';
import { WorkflowStage } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent {
  @Input() stage:WorkflowStage = <WorkflowStage> {};
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('stage',this.stage);
  }
}
