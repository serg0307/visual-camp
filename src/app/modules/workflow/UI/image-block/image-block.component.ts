import { Component, Input } from '@angular/core';
import { WorkflowItem } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent {
  @Input() item: WorkflowItem = <WorkflowItem>{};
  @Input() imageIndex = -1;
}
