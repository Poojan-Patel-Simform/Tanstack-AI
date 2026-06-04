import { KanbanBoardColumns } from "@/constant/kanban";
import { TaskStatusEnum, Task } from "@/types/kanban";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { syncStatus, updateStatus } from "@/app/actions/task";

type PropsType = {
  data: Task[];
};

export const useKanbanDrag = ({ data }: PropsType) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

  const tasksByColumn = KanbanBoardColumns.reduce(
    (acc, column) => {
      acc[column.id] = optimisticTasks.filter(
        (task) => task.status === column.id,
      );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    const taskStatusEnumValues: string[] = Object.values(TaskStatusEnum);

    if (
      over?.id &&
      taskStatusEnumValues.includes(String(over.id)) &&
      !over?.data?.current
    ) {
      startTransition(async () => {
        const updatedList = tasks.map((task) => {
          if (task.id === active.id) {
            return {
              ...task,
              status: over.id as TaskStatusEnum,
            };
          } else {
            return task;
          }
        });
        setOptimisticTasks(updatedList);
        await updateStatus(String(active.id), over.id as TaskStatusEnum);
      });
    }

    if (active.id && over?.id) {
      startTransition(async () => {
        const targetTask = tasks.find((task) => task.id === over.id);
        if (targetTask) {
          const updatedList = tasks.map((task) => {
            if (task.id === active.id) {
              return {
                ...task,
                status: targetTask.status,
              };
            } else {
              return task;
            }
          });

          setOptimisticTasks(updatedList);
        }
        await syncStatus(String(active.id), String(over.id));
      });
    }

    console.log(active, over);
  };

  useEffect(() => {
    setTasks(data);
  }, [data]);

  return { activeTask, handleDragStart, handleDragEnd, tasksByColumn };
};
