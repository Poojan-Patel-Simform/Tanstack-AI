export enum KanbanColumnEnum {
  BACKLOG,
  TODO,
  IN_PROGRESS,
  DONE,
}

export type Task = {
  id: string;
  title: string;
  description: string;
  column: KanbanColumnEnum;
};
