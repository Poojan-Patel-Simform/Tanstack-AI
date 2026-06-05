import { KanbanBoardColumns } from "@/constant/kanban";
import { TaskStatusEnum, Task } from "@/types/kanban";
import { useEffect, useRef, useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { updateTaskStatus } from "@/actions/task";

type PropsType = {
  data: Task[];
};

export const useKanbanDrag = ({ data }: PropsType) => {
  const [tasks, setTasks] = useState<Task[]>(data);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const pendingUpdate = useRef<{
    taskId: string;
    status: TaskStatusEnum;
  } | null>(null);

  useEffect(() => {
    if (pendingUpdate.current) {
      const { taskId, status } = pendingUpdate.current;
      setTasks(
        data.map((task) => (task.id === taskId ? { ...task, status } : task)),
      );
    } else {
      setTasks(data);
    }
  }, [data]);

  const tasksByColumn = KanbanBoardColumns.reduce(
    (acc, column) => {
      acc[column.id] = tasks
        .filter((task) => task.status === column.id)
        .sort((a, b) => a.order - b.order);
      return acc;
    },
    {} as Record<TaskStatusEnum, Task[]>,
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const applyOptimisticReorder = (
    taskId: string,
    newStatus: TaskStatusEnum,
    prevOrder: number | null,
    nextOrder: number | null,
  ) => {
    const newOrder =
      prevOrder === null && nextOrder === null
        ? 1000
        : prevOrder === null
          ? nextOrder! - 500
          : nextOrder === null
            ? prevOrder + 1000
            : (prevOrder + nextOrder) / 2;

    pendingUpdate.current = { taskId, status: newStatus };
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, order: newOrder }
          : task,
      ),
    );
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over?.id) return;

    const taskStatusEnumValues = Object.values(TaskStatusEnum);

    const sourceTask = tasks.find((task) => task.id === active.id);
    const targetTask = tasks.find((task) => task.id === over.id);
    const targetColumn: TaskStatusEnum | undefined = taskStatusEnumValues.find(
      (column) => column === over.id,
    );

    if (sourceTask && targetColumn && !targetTask) {
      const snapshot = tasks;
      const targetColumnTasks = tasksByColumn[targetColumn];
      const prevOrder = targetColumnTasks.at(-1)?.order ?? null;

      applyOptimisticReorder(sourceTask.id, targetColumn, prevOrder, null);

      try {
        await updateTaskStatus({
          sourceTask,
          newStatus: targetColumn,
          prevOrder,
          nextOrder: null,
        });
      } catch {
        setTasks(snapshot);
      } finally {
        pendingUpdate.current = null;
      }
    } else if (sourceTask && targetTask && !targetColumn) {
      const snapshot = tasks;

      const targetColumnTasks = tasksByColumn[targetTask.status].toSorted(
        (a, b) => a.order - b.order,
      );

      const withoutSourceTaskList = targetColumnTasks.filter(
        (task) => task.id !== sourceTask.id,
      );

      const targetIndex = withoutSourceTaskList.findIndex(
        (task) => task.id === targetTask.id,
      );

      if (targetIndex === -1) return;

      const sourceIndex = targetColumnTasks.findIndex(
        (task) => task.id === sourceTask.id,
      );
      const isDraggingUp = sourceIndex > targetIndex;

      let prevOrder: number | null;
      let nextOrder: number | null;

      if (isDraggingUp) {
        prevOrder = withoutSourceTaskList[targetIndex - 1]?.order ?? null;
        nextOrder = withoutSourceTaskList[targetIndex].order;
      } else {
        prevOrder = withoutSourceTaskList[targetIndex].order;
        nextOrder = withoutSourceTaskList[targetIndex + 1]?.order ?? null;
      }

      applyOptimisticReorder(
        sourceTask.id,
        targetTask.status,
        prevOrder,
        nextOrder,
      );

      try {
        await updateTaskStatus({
          sourceTask,
          newStatus: targetTask.status,
          prevOrder,
          nextOrder,
        });
      } catch {
        setTasks(snapshot);
      } finally {
        pendingUpdate.current = null;
      }
    }
  };

  return { activeTask, handleDragStart, handleDragEnd, tasksByColumn };
};
