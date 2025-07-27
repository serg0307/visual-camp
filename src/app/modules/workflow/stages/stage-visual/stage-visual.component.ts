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
  widthOld = 50;
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
      console.log(event.touches[0].clientX);
    }
  }
  select(item: WorkflowItem) {
    this.stage.completed = true;
    this.workflow.saveStage(this.stage);
  }
  handleClick(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.clientY;
    this.widthOld = x;
    if (x < 50) {
      this.widthOld = 50;
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
