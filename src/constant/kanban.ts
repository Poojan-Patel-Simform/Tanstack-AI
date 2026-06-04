import { TaskStatusEnum } from "@/types/kanban";

export const KanbanBoardColumns: {
  id: TaskStatusEnum;
  title: string;
}[] = [
  {
    id: TaskStatusEnum.BACKLOG,
    title: "Backlog",
  },
  {
    id: TaskStatusEnum.TODO,
    title: "To Do",
  },
  {
    id: TaskStatusEnum.IN_PROGRESS,
    title: "In Progress",
  },
  {
    id: TaskStatusEnum.DONE,
    title: "Done",
  },
];
