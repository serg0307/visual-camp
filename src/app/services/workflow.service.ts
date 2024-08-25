import { Injectable } from '@angular/core';
import { FileTypesEnum, Workflow, WorkflowItem } from '../interfaces/workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor() { }

  getWorkflow(): Workflow {
    const wf: Workflow = {
      title: 'Nice movie',
      id: '1',
      stages: {
        audio: {
          title: 'Звук',
          id: 'sound',
          completed: false,
          items: [
            {
              title: '1',
              fileUrl: '/assets/audio/track1.mp3',
              fileType: FileTypesEnum.SOUND,
              id: '1',
              description: ''
            },
            {
              title: '2',
              fileUrl: '/assets/audio/track1.mp3',
              fileType: FileTypesEnum.SOUND,
              id: '2',
              description: ''
            },
            {
              title: '3',
              fileUrl: '/assets/audio/track1.mp3',
              fileType: FileTypesEnum.SOUND,
              id: '3',
              description: ''
            },
          ]
        },
        atmosphere: {
          title: 'Атмосфера',
          id: 'atmosphere',
          completed: false,
          items: []
        },
        animation: {
          title: 'Аніматік',
          id: 'animatic',
          completed: false,
          items: [
            {
              title: '1',
              fileUrl: '/assets/video/Oceanix2_BIG.mp4',
              fileType: FileTypesEnum.VIDEO,
              id: '52',
              description: ''
            }
          ]
        },
        visual: {
          title: 'Візуал',
          id: 'visual',
          completed: false,
          items: [
            {
              title: 'Атмосфера 1',
              fileUrl: '/assets/images/mock/visual1-1.jpg',
              fileUrlProd: '/assets/images/mock/visual1-0.jpg',
              fileType: FileTypesEnum.IMAGE,
              id: '53',
              description: ''
            },
            {
              title: 'Атмосфера 1',
              fileUrl: '/assets/images/mock/visual1-1.jpg',

              fileType: FileTypesEnum.IMAGE,
              id: '53',
              description: ''
            }
          ]
        },
      }
    }
    this.addAtmospheres(wf);
    return wf;
  }
  addAtmospheres(wf: Workflow): void {
    for (let index = 1;index < 13; index++) {
      const item:WorkflowItem = {
        id: index.toString(),
        title: index.toString(),
        fileUrl: `/assets/images/atmospheres/${index}.jpg`,
        fileType: FileTypesEnum.IMAGE,
        description: ''
      }
      wf.stages.atmosphere.items.push(item);
    }

  }

}
