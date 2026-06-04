export enum TaskStatusEnum {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum PriorityEum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatusEnum;
  priority: PriorityEum;
  storyPoints: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskType = Pick<Task, "title"> &
  Partial<Pick<Task, "description" | "status" | "priority" | "storyPoints">>;
