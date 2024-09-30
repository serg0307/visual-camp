import { Component, inject, Input } from '@angular/core';
import { FileTypesEnum, Workflow, WorkflowItem, WorkflowStage } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-workflow-page',
  templateUrl: './workflow-page.component.html',
  styleUrls: ['./workflow-page.component.scss']
})
export class WorkflowPageComponent {
  @Input() id = '';
  workflow: Workflow = <Workflow>{};
  private workflowService = inject(WorkflowService);
  async ngOnInit(): Promise<void> {
    this.workflow = this.workflowService.getWorkflow();
    const nodes = await this.workflowService.getProjectWorkflow(this.id);
    if (nodes.length > 0) {
      const node: any = nodes.pop();
      this.workflow.id = this.id;
      this.workflow.title = node.attributes.title;
      const stages = await this.workflowService.getProjectWorkflowStages(node.attributes.drupal_internal__nid);
      stages.map((stage: any) => {
        switch (stage.relationships.field_stage_type.data.meta.drupal_internal__target_id) {
          case 18:
            console.log('audio', stage);
            const stageAudio: WorkflowStage = {
              id: stage.id,
              title: 'Audio',
              items: [],
              completed: stage.attributes.field_completed,
              declined: stage.attributes.field_declined,
            }
            if (stageAudio.completed) {
              stageAudio.result = [];
              stage.relationships.field_result.data.forEach((item:any) => {
                const inc = stage.included.find((el: any) => el.id == item.id);
                const i: WorkflowItem = {
                  id: item.id,
                  title: inc.attributes.filename.split('.')[0],
                  fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                  fileType: FileTypesEnum.SOUND,
                  description: ''
                }
                stageAudio.result?.push(i);
              });

            }
            stage.relationships.field_items.data.forEach((item:any) => {
              const inc = stage.included.find((el: any) => el.id == item.id);
              const i: WorkflowItem = {
                id: item.id,
                title: inc.attributes.filename.split('.')[0],
                fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                fileType: FileTypesEnum.SOUND,
                description: ''
              }
              stageAudio.items.push(i);
            });
            this.workflow.stages.audio = stageAudio;
            break;
          case 19:
            const stageAtmosphere: WorkflowStage = {
              id: stage.id,
              title: 'Atmosphere',
              items: [],
              completed: stage.attributes.field_completed,
              declined: stage.attributes.field_declined,
            }
            console.log('atmosphere', stageAtmosphere);
            this.workflow.stages.atmosphere = stageAtmosphere;
            if (stageAtmosphere.completed) {
              stageAtmosphere.result = [];
              stage.relationships.field_result.data.forEach((item:any) => {
                const inc = stage.included.find((el: any) => el.id == item.id);
                const i: WorkflowItem = {
                  id: item.id,
                  title: inc.attributes.filename.split('.')[0],
                  fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                  fileType: FileTypesEnum.IMAGE,
                  description: ''
                }
                stageAtmosphere.result?.push(i);
              });
            }
            break;
          case 21:
            const stageAnimation: WorkflowStage = {
              id: stage.id,
              title: 'Animatic',
              items: [],
              completed: stage.attributes.field_completed,
              declined: stage.attributes.field_declined,
            }
            stage.relationships.field_items.data.forEach((item:any) => {
              const inc = stage.included.find((el: any) => el.id == item.id);
              const i: WorkflowItem = {
                id: item.id,
                title: inc.attributes.filename.split('.')[0],
                fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                fileType: FileTypesEnum.VIDEO,
                description: ''
              }
              stageAnimation.items.unshift(i);
            });
            if (stageAnimation.completed) {
              stageAnimation.result = [];
              stage.relationships.field_result.data.forEach((item:any) => {
                const inc = stage.included.find((el: any) => el.id == item.id);
                const i: WorkflowItem = {
                  id: item.id,
                  title: inc.attributes.filename.split('.')[0],
                  fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                  fileType: FileTypesEnum.VIDEO,
                  description: ''
                }
                stageAnimation.result?.push(i);
              });
            }
            /**
             * Якщо відхилено клієнтом, додаємо ще один ітем і прибираємо прапорець.
             * Активний тільки останній (що йде в списку першим)
             */
            this.workflow.stages.animation = stageAnimation;
            break;
          case 20:
            const stageVisual: WorkflowStage = {
              id: stage.id,
              title: 'Visual',
              items: [],
              completed: stage.attributes.field_completed,
              declined: stage.attributes.field_declined,
            }
            stage.relationships.field_items.data.forEach((item:any) => {
              const inc = stage.included.find((el: any) => el.id == item.id);
              const i: WorkflowItem = {
                id: item.id,
                title: inc.attributes.filename.split('.')[0],
                fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                fileType: FileTypesEnum.IMAGE,
                description: ''
              }
              stageVisual.items.push(i);
            });
            stageVisual.result = [];
            stage.relationships.field_result.data.forEach((item:any) => {
              const inc = stage.included.find((el: any) => el.id == item.id);
              const i: WorkflowItem = {
                id: item.id,
                title: inc.attributes.filename.split('.')[0],
                fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                fileType: FileTypesEnum.VIDEO,
                description: ''
              }
              stageVisual.result?.push(i);
            });
            this.workflow.stages.visual.push(stageVisual);
            console.log('stageVisual', stageVisual)
            break;

          default:
            console.log('default', stage.relationships.field_stage_type.data.meta.drupal_internal__target_id)
            break;
        }
      });
      this.workflowService.addDefaultFiles(this.workflow.stages.atmosphere);
      console.log('workflow', this.workflow);
    }
  }

  yes(stage: WorkflowStage) {
    stage.completed = true;
  }
  no(stage: WorkflowStage) {

  }
  isCurrent(): string {
    if (!this.workflow.stages.audio.completed) {
      return 'audio';
    }
    if (!this.workflow.stages.atmosphere.completed) {
      return 'atmosphere';
    }
    if (!this.workflow.stages.animation.completed) {
      return 'animation';
    }
    return 'visual';
  }
}
