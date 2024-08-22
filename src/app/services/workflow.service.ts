import { Injectable } from '@angular/core';
import { FileTypesEnum, Workflow } from '../interfaces/workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor() { }

  getWorkflow(): Workflow {
    const wf: Workflow = {
      title: 'Проект "Класне кіно"',
      id: '1',
      stages: [
        {
          title: 'Звук',
          id: 'sound',
          completed: false,
          items: [
            {
              title: 'Трек 1',
              fileUrl: '/assets/audio/nightfall-future-bass-music-228100.mp3',
              fileType: FileTypesEnum.SOUND,
              id: '1',
              description: ''
            },
            {
              title: 'Трек 2',
              fileUrl: '/assets/audio/nightfall-future-bass-music-228100.mp3',
              fileType: FileTypesEnum.SOUND,
              id: '2',
              description: ''
            },
            {
              title: 'Трек 3',
              fileUrl: '/assets/audio/nightfall-future-bass-music-228100.mp3',
              fileType: FileTypesEnum.SOUND,
              id: '3',
              description: ''
            },
          ]
        },
        {
          title: 'Атмосфера',
          id: 'atmosphere',
          completed: false,
          items: [
            {
              title: 'Атмосфера 1',
              fileUrl: '/assets/images/mock/setting1.jpg',
              fileType: FileTypesEnum.IMAGE,
              id: '33',
              description: ''
            },
            {
              title: 'Атмосфера 2',
              fileUrl: '/assets/images/mock/setting2.jpg',
              fileType: FileTypesEnum.IMAGE,
              id: '34',
              description: ''
            },{
              title: 'Атмосфера 1',
              fileUrl: '/assets/images/mock/setting1.jpg',
              fileType: FileTypesEnum.IMAGE,
              id: '37',
              description: ''
            },
            {
              title: 'Атмосфера 2',
              fileUrl: '/assets/images/mock/setting2.jpg',
              fileType: FileTypesEnum.IMAGE,
              id: '38',
              description: ''
            },
          ]
        },
        {
          title: 'Аніматік',
          id: 'animatic',
          completed: false,
          items: [
            {
              title: 'Аніматік 1',
              fileUrl: '/assets/video/Oceanix2_BIG.mp4',
              fileType: FileTypesEnum.VIDEO,
              id: '52',
              description: ''
            }
          ]
        },
        {
          title: 'Візуал',
          id: 'visual',
          completed: false,
          items: [
            {
              title: 'Атмосфера 1',
              fileUrl: '/assets/images/mock/visual1-0.jpg',
              fileUrlProd: '/assets/images/mock/visual1-1.jpg',
              fileType: FileTypesEnum.IMAGE,
              id: '53',
              description: ''
            }
          ]
        },

      ],
      currentStage: 0
    }

    return wf;
  }
  next(workflow: Workflow) {

  }
}
