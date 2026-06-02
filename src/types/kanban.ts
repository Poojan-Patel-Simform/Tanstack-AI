export enum KanbanColumnEnum {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type Task = {
  id: string;
  title: string;
  description: string;
  column: KanbanColumnEnum;
};
