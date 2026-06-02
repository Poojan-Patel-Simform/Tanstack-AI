import { KanbanColumnEnum } from "@/types/kanban";

export const KanbanBoardColumns: {
  id: KanbanColumnEnum;
  title: string;
}[] = [
  {
    id: KanbanColumnEnum.BACKLOG,
    title: "Backlog",
  },
  {
    id: KanbanColumnEnum.TODO,
    title: "To Do",
  },
  {
    id: KanbanColumnEnum.IN_PROGRESS,
    title: "In Progress",
  },
  {
    id: KanbanColumnEnum.DONE,
    title: "Done",
  },
];
