export interface Workflow {
  id: string;
  title: string;
  stages: WorkflowStagesList;
  resultTitle: string;
  result: string;
  completed: boolean;
}

export interface WorkflowStage {
  id: string;
  title: string;
  items: WorkflowItem[];
  result?: WorkflowItem[];
  completed: boolean;
  declined?: boolean;
  declineText?: string;
  isApproveStage?: boolean;
  type: WorkflowStageType;
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

interface WorkflowStagesList {
  audio: WorkflowStage;
  atmosphere: WorkflowStage;
  animation: WorkflowStage;
  visual: WorkflowStage[];
}
export interface WorkflowStageType {
  activeTitle: string;
  activeDescription: string;
  showResultInHeader: boolean;
  title: string;
}
export enum FileTypesEnum {
  SOUND = "audio",
  VIDEO = 'video',
  IMAGE = 'image',
}
