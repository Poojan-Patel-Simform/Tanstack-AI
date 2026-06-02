import { create } from "zustand";
import { KanbanColumnEnum, Task } from "@/types/kanban";

interface KanbanStore {
  tasks: Task[];

  // CRUD
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, column: KanbanColumnEnum) => void;

  // DnD helper
  reorderTasks: (tasks: Task[]) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  tasks: [
    {
      id: "1",
      title: "Set up project repository",
      description:
        "Initialize the repository and configure the development environment.",
      column: KanbanColumnEnum.BACKLOG,
    },
    {
      id: "2",
      title: "Design task card component",
      description:
        "Create the UI component for displaying task information on the board.",
      column: KanbanColumnEnum.TODO,
    },
    {
      id: "3",
      title: "Implement drag-and-drop",
      description:
        "Enable moving tasks between columns using drag-and-drop interactions.",
      column: KanbanColumnEnum.IN_PROGRESS,
    },
    {
      id: "4",
      title: "Add task filtering",
      description: "Allow users to filter tasks by title, status, or keywords.",
      column: KanbanColumnEnum.IN_PROGRESS,
    },
    {
      id: "5",
      title: "Write unit tests",
      description:
        "Create test coverage for task management and board interactions.",
      column: KanbanColumnEnum.DONE,
    },
  ],

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
        },
      ],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  moveTask: (id, column) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, column } : task,
      ),
    })),

  reorderTasks: (tasks) =>
    set({
      tasks,
    }),
}));
