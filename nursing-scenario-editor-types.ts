export type NodeVariables = { [key: string]: any };

export interface BaseNodeData {
  id: string;
  title: string;
  content?: string;
  imageUrl?: string;
  variables?: NodeVariables;
}

export interface StoryNodeData extends BaseNodeData {
  type: 'story';
}

export interface ChoiceNodeData extends BaseNodeData {
  type: 'choice';
  choices: { label: string; nextNodeId: string }[];
}

export interface ConditionNodeData extends BaseNodeData {
  type: 'condition';
  condition: string;
}

export interface ProcedureNodeData extends BaseNodeData {
  type: 'procedure';
  steps: string[];
}

export type NursingNodeData = 
  | StoryNodeData 
  | ChoiceNodeData 
  | ConditionNodeData 
  | ProcedureNodeData;
