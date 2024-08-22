import { Component, Input } from '@angular/core';
import { WorkflowItem } from 'src/app/interfaces/workflow';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent {
  @Input() item: WorkflowItem = <WorkflowItem>{};
}
