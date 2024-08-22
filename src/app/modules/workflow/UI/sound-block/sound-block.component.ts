import { Component, Input } from '@angular/core';
import { WorkflowItem } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-sound-block',
  templateUrl: './sound-block.component.html',
  styleUrls: ['./sound-block.component.scss']
})
export class SoundBlockComponent {
  @Input() item: WorkflowItem = <WorkflowItem>{};
  checkboxClicked() {

  }
}
