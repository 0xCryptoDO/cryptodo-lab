export enum Step {
  compilation = 'compilation',
  aiGeneration = 'aiGeneration',
  deploy = 'deploy',
  verification = 'verification',
  error = 'error',
  rejectNetwork = 'rejectNetwork'
}

export interface StepMeta {
  id: Step;
  title: string;
  message: string;
}
