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
  taskId: string;
  title: string;
  description?: string;
  status: TaskStatusEnum;
  priority: PriorityEum;
  storyPoints: number;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskType = Pick<Task, "title"> &
  Partial<Pick<Task, "description" | "status" | "priority" | "storyPoints">>;

export type UpdateTaskStatusInput = {
  sourceTask: Task;
  newStatus: TaskStatusEnum;
  prevOrder: number | null;
  nextOrder: number | null; // order of the task below, null if bottom
};
