export interface Workflow {
  id: string;
  title: string;
  stages: WorkflowStage[];
  currentStage: number;
}

export interface WorkflowStage {
  id: string;
  title: string;
  items: WorkflowItem[];
  result?: WorkflowItem[];
  completed: boolean;
}

export interface WorkflowItem {
  id: string;
  title: string;
  fileUrl: string;
  fileUrlProd?: string;
  fileType: FileTypesEnum;
  description: string;
  selected?: boolean;
}

export enum FileTypesEnum {
  SOUND = "sound",
  VIDEO = 'video',
  IMAGE = 'image',
}
