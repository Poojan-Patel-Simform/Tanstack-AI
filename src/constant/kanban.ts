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

export const COLUMN_STYLES = {
  BACKLOG: {
    countBg: "bg-muted",
    countText: "text-muted-foreground",
    accentBorder: "border-t-slate-400",
    headerLine: "border-slate-100 dark:border-slate-800",
  },
  TODO: {
    countBg: "bg-blue-50 dark:bg-blue-950",
    countText: "text-blue-600 dark:text-blue-400",
    accentBorder: "border-t-blue-400",
    headerLine: "border-blue-100 dark:border-blue-900",
  },
  IN_PROGRESS: {
    countBg: "bg-amber-50 dark:bg-amber-950",
    countText: "text-amber-700 dark:text-amber-400",
    accentBorder: "border-t-amber-400",
    headerLine: "border-amber-100 dark:border-amber-900",
  },
  DONE: {
    countBg: "bg-green-50 dark:bg-green-950",
    countText: "text-green-700 dark:text-green-400",
    accentBorder: "border-t-green-500",
    headerLine: "border-green-100 dark:border-green-900",
  },
};

export const PRIORITY_CONFIG = {
  LOW: {
    dot: "bg-slate-400",
    label: "Low",
    badge: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
  },
  MEDIUM: {
    dot: "bg-amber-400",
    label: "Medium",
    badge: "bg-amber-50  dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-400",
  },
  HIGH: {
    dot: "bg-orange-500",
    label: "High",
    badge: "bg-orange-50 dark:bg-orange-950",
    text: "text-orange-700 dark:text-orange-400",
  },
  CRITICAL: {
    dot: "bg-red-500",
    label: "Critical",
    badge: "bg-red-50    dark:bg-red-950",
    text: "text-red-700 dark:text-red-400",
  },
};
