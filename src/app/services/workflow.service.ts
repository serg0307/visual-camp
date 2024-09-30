import { Injectable } from '@angular/core';
import { FileTypesEnum, Workflow, WorkflowItem, WorkflowStage } from '../interfaces/workflow';
import { DrupalService } from 'projects/drupal/src/public-api';
import { FilterOperator } from 'projects/drupal/src/lib/DrupalApi/enum';
import { JsonApiSettings } from 'projects/drupal/src/lib/DrupalApi/jsonapi-settings';
import { HttpClient } from '@angular/common/http';
import { env_enum } from 'projects/drupal/src/lib/DrupalApi/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private drupal: DrupalService, private http: HttpClient) { }
  async getProjectWorkflow(id: string) {
    const settings = new JsonApiSettings();
    settings.entityBundle = { type: 'node', bundle: 'project_flow' };
    //settings.include = ['field_project_image', 'field_download', 'field_project'];
    settings.addFilter('id', id, FilterOperator.EQUAL);
    const res = await this.drupal.getCollection(settings);
    return res;
  }
  async getAtmosphereImages() {
    const settings = new JsonApiSettings();
    settings.entityBundle = { type: 'taxonomy_term', bundle: 'project_flow_stages' };
    settings.include = ['field_default_items'];
    settings.addFilter('tid', "19", FilterOperator.EQUAL);
    const res = await this.drupal.getCollection(settings);
    return res;
  }
  async getProjectWorkflowStages(nid: number) {
    const settings = new JsonApiSettings();
    settings.entityBundle = { type: 'comment', bundle: 'project_flow_stage' };
    settings.include = ['field_items', 'field_result'];
    settings.addFilter('entity_id.meta.drupal_internal__target_id', nid.toString(), FilterOperator.EQUAL);
    const res = await this.drupal.getCollection(settings);
    return res;
  }
  async addDefaultFiles(stage: WorkflowStage): Promise<void> {
    const terms = await this.getAtmosphereImages();
    if (terms.length > 0) {
      const term: any = terms.pop();
      term.relationships.field_default_items.data.forEach((item: any) => {
        const inc = term.included.find((el: any) => el.id == item.id);
        const i: WorkflowItem = {
          id: item.id,
          title: inc.attributes.filename.split('.')[0],
          fileUrl: 'https://admin.visualcamp.com.ua/' + inc.attributes.uri.url,
          fileType: FileTypesEnum.IMAGE,
          description: ''
        }
        stage.items.push(i);
      });
    }
  }
  getWorkflow(): Workflow {
    const wf: Workflow = {
      title: '',
      id: '',
      stages: {
        audio: {
          title: 'Audio',
          id: '',
          completed: false,
          items: [
          ]
        },
        atmosphere: {
          title: 'Atmosphere',
          id: '',
          completed: false,
          items: []
        },
        animation: {
          title: 'Animatic',
          id: '',
          completed: false,
          items: [
          ],
          isApproveStage: true,
        },
        visual: {
          title: 'Visual',
          id: '',
          completed: false,
          items: [
          ],
          isApproveStage: true,
        },
      }
    }
    return wf;
  }
  addAtmospheres(wf: Workflow): void {
    for (let index = 1; index < 13; index++) {
      const item: WorkflowItem = {
        id: index.toString(),
        title: index.toString(),
        fileUrl: `/assets/images/atmospheres/${index}.jpg`,
        fileType: FileTypesEnum.IMAGE,
        description: ''
      }
      wf.stages.atmosphere.items.push(item);
    }
  }
  saveStage(stage: WorkflowStage): void {
    const data:SaveStageData = {
      stageId: stage.id,
      resultFileId: '',
      feedback: ''
    }

    if (stage.declined) {
      if (stage.declineText) {
        data.feedback = stage.declineText;
      }
      this.http.post(env_enum.BACKEND_URL + '/jsonapi/project_flow/decline', data).subscribe(data => {
        console.log(data);
      });
      return;
    }
    if (stage.completed) {
      if (stage.result && !stage.isApproveStage) {
        const el = stage.result[0];
        if (el) {
          data.resultFileId = el.id;
        }
      }

      this.http.post(env_enum.BACKEND_URL + '/jsonapi/project_flow/accept', data).subscribe(data => {
        console.log(data);
      });

    }
  }
}
interface SaveStageData {
  stageId: string;
  resultFileId: string;
  feedback: string;
}
