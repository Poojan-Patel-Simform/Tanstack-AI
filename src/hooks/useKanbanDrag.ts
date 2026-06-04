import { KanbanBoardColumns } from "@/constant/kanban";
import { TaskStatusEnum, Task } from "@/types/kanban";
import { useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useKanbanStore } from "@/store/kanban-store";

export const useKanbanDrag = () => {
  const tasks = useKanbanStore((store) => store.tasks);
  const reorderTasks = useKanbanStore((store) => store.reorderTasks);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const tasksByColumn = KanbanBoardColumns.reduce(
    (acc, column) => {
      acc[column.id] = tasks.filter((task) => task.status === column.id);

      return acc;
    },
    {} as Record<TaskStatusEnum, Task[]>,
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeTask = tasks.find((task) => task.id === activeId);

    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === overId);

    if (!over.data.current || !overTask) {
      const targetColumn = overId;

      const updatedTaskList: Task[] = tasks.map((task: Task) =>
        task.id === activeId
          ? { ...task, status: targetColumn as TaskStatusEnum }
          : task,
      );

      reorderTasks(updatedTaskList);

      return;
    }

    // Same column sorting
    if (activeTask.status === overTask.status) {
      const columnTasks = tasksByColumn[activeTask.status];

      const oldIndex = columnTasks.findIndex((task) => task.id === activeId);

      const newIndex = columnTasks.findIndex((task) => task.id === overId);

      const reorderedColumn = arrayMove(columnTasks, oldIndex, newIndex);

      const otherTasks = tasks.filter(
        (task) => task.status !== activeTask.status,
      );

      const updatedTaskList = [...otherTasks, ...reorderedColumn];

      reorderTasks(updatedTaskList);

      return;
    }

    // Move between columns
    const sourceColumnTasks = tasksByColumn[activeTask.status];

    const destinationColumnTasks = tasksByColumn[overTask.status];

    const destinationIndex = destinationColumnTasks.findIndex(
      (task) => task.id === overId,
    );

    const movingTask = {
      ...activeTask,
      status: overTask.status,
    };

    const newSourceTasks = sourceColumnTasks.filter(
      (task) => task.id !== activeId,
    );

    const newDestinationTasks = [...destinationColumnTasks];

    newDestinationTasks.splice(destinationIndex, 0, movingTask);

    const remainingTasks = tasks.filter(
      (task) =>
        task.status !== activeTask.status && task.status !== overTask.status,
    );

    const updatedTaskList = [
      ...remainingTasks,
      ...newSourceTasks,
      ...newDestinationTasks,
    ];

    reorderTasks(updatedTaskList);
  };

  return { activeTask, handleDragStart, handleDragEnd, tasksByColumn };
};
