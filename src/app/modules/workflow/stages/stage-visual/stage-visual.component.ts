import { Component, Input } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { WorkflowStage, WorkflowItem } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';


@Component({
  selector: 'app-stage-visual',
  templateUrl: './stage-visual.component.html',
  styleUrls: ['./stage-visual.component.scss'],
})
export class StageVisualComponent {
  @Input() stage: WorkflowStage = <WorkflowStage>{};
  @Input() index = 0;
  divWidthOld = 0;
  widthOld = 0;
  isDragging = false;
  constructor(private workflow: WorkflowService) { }
  logTouchstart(event: TouchEvent) {
    event.preventDefault();
    this.widthOld = event.touches[0].clientX;
    this.isDragging = true;

  }
  logTouchend(event: TouchEvent) {
    this.isDragging = false;
  }
  logTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      this.widthOld = event.touches[0].clientX;
      console.log('clientX', event.touches[0].clientX);
    }
  }
  select(item: WorkflowItem) {
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
  }
  handleClick(event: MouseEvent) {
    const e = <any>event;
    console.log(e.target.nodeName);

    if (e.target.nodeName != 'svg' && e.target.nodeName != 'path' ) {
      const x = e.offsetX;
      this.widthOld = x;

      console.log('--- mouse x', x);
      console.log('e', e);
      console.log('target', e.target);
      console.log('target node name', e.target.nodeName);
    } else {
      this.widthOld = this.widthOld + e.movementX;
    }
  }
  mouseDown(event: MouseEvent) {
    this.isDragging = true;
  }
  mouseUp(event: MouseEvent) {
    this.isDragging = false;
  }
  mouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.handleClick(event);
    }
  }
  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
  }

}
