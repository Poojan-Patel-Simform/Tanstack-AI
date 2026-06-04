import { create } from "zustand";
import { TaskStatusEnum, Task, PriorityEum } from "@/types/kanban";

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Set up project repository",
    description: "Initialize the repository and development environment.",
    status: TaskStatusEnum.DONE,
    priority: PriorityEum.HIGH,
    storyPoints: 3,
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-01T11:30:00.000Z",
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Add JWT authentication and session handling.",
    status: TaskStatusEnum.IN_PROGRESS,
    priority: PriorityEum.CRITICAL,
    storyPoints: 8,
    createdAt: "2026-06-01T14:15:00.000Z",
    updatedAt: "2026-06-03T08:45:00.000Z",
  },
  {
    id: "3",
    title: "Create task management API",
    description: "Build CRUD APIs for task operations.",
    status: TaskStatusEnum.TODO,
    priority: PriorityEum.HIGH,
    storyPoints: 5,
    createdAt: "2026-06-02T10:00:00.000Z",
    updatedAt: "2026-06-02T10:00:00.000Z",
  },
  {
    id: "4",
    title: "Design Kanban board UI",
    description: "Create responsive drag-and-drop task board.",
    status: TaskStatusEnum.BACKLOG,
    priority: PriorityEum.MEDIUM,
    storyPoints: 8,
    createdAt: "2026-06-02T16:20:00.000Z",
    updatedAt: "2026-06-02T16:20:00.000Z",
  },
  {
    id: "5",
    title: "Write unit tests",
    description: "Increase test coverage for core modules.",
    status: TaskStatusEnum.TODO,
    priority: PriorityEum.LOW,
    storyPoints: 2,
    createdAt: "2026-06-03T07:30:00.000Z",
    updatedAt: "2026-06-03T07:30:00.000Z",
  },
];

interface KanbanStore {
  tasks: Task[];

  // CRUD
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatusEnum) => void;

  // DnD helper
  reorderTasks: (tasks: Task[]) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  tasks: dummyTasks,

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
