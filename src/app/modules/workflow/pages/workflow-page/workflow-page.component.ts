import { Component, inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTypesEnum, Workflow, WorkflowItem, WorkflowStage, WorkflowStageType } from 'src/app/interfaces/workflow';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-workflow-page',
  templateUrl: './workflow-page.component.html',
  styleUrls: ['./workflow-page.component.scss']
})
export class WorkflowPageComponent {
  @Input() id = '';
  completed = false;
  workflow: Workflow = <Workflow>{};
  private workflowService = inject(WorkflowService);
  public sanitizer = inject(DomSanitizer);
  async ngOnInit(): Promise<void> {
    this.workflow = this.workflowService.getWorkflow();
    const nodes = await this.workflowService.getProjectWorkflow(this.id);
    if (nodes.length > 0) {
      const node: any = nodes.pop();
      this.workflow.id = this.id;
      this.workflow.title = node.attributes.title;
      this.workflow.resultTitle = node.attributes['field_result_title'];
      if (node.attributes['field_result']) {
        this.workflow.result = node.attributes['field_result'].processed;
      } else {
        this.workflow.result = '';
      }
      this.workflow.completed = node.attributes['field_completed'];
      const stages = await this.workflowService.getProjectWorkflowStages(node.attributes.drupal_internal__nid);
      stages.map((stage: any) => {
        const type = stage.included.find((el: any) => el.id == stage.relationships.field_stage_type.data?.id);
        const stageType: WorkflowStageType = {
          activeTitle: type.attributes['field_active_title'],
          activeDescription: type.attributes['field_active_description'],
          showResultInHeader: type.attributes['field_show_result_in_header'],
          title: type.attributes.title,
        };

        switch (stage.relationships.field_stage_type.data?.meta.drupal_internal__target_id) {
          case 18:
            const stageAudio: WorkflowStage = {
              id: stage.id,
              title: 'Audio',
              items: [],
              completed: stage.attributes.field_completed,
              declined: stage.attributes.field_declined,
              type: stageType,
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
              type: stageType,
            }
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
              type: stageType,
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
              type: stageType,
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
            if (stage.relationships.field_result.data) {
              stage.relationships.field_result.data.forEach((item:any) => {
                const inc = stage.included.find((el: any) => el.id == item.id);
                const i: WorkflowItem = {
                  id: item.id,
                  title: '',
                  fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
                  fileType: FileTypesEnum.IMAGE,
                  description: ''
                }
                stageVisual.result?.push(i);
              });
              this.workflow.stages.visual.push(stageVisual);
            }
            break;

          default:

            break;
        }
      });
      this.workflowService.addDefaultFiles(this.workflow.stages.atmosphere);
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
    // need to run over
    let res = true;
    this.workflow.stages.visual.forEach(el => {
      if (!el.completed) {
        res = false;
      }
    });
    if (!res) {
      return 'visual';
    }
    return 'fire';

  }
  getResult(stage: any):WorkflowItem[]  {
    const result:WorkflowItem[] = [];
    if (stage.relationships.field_result.data) {
      stage.relationships.field_result.data.forEach((item:any) => {
        const inc = stage.included.find((el: any) => el.id == item.id);
        const i: WorkflowItem = {
          id: item.id,
          title: inc.attributes.filename.split('.')[0],
          fileUrl: 'https://admin.visualcamp.com.ua/'+inc.attributes.uri.url,
          fileType: FileTypesEnum.VIDEO,
          description: ''
        }
        result?.push(i);
      });
    }
    return result;
  }
}
