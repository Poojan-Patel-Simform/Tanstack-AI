"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import { KanbanBoardColumns } from "@/constant/kanban";
import { useKanbanDrag } from "@/hooks/useKanbanDrag";
import { Task } from "@/types/kanban";

type PropsType = {
  data: Task[];
};

const KanbanBoard = ({ data }: PropsType) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );
  const { activeTask, handleDragStart, handleDragEnd, tasksByColumn } =
    useKanbanDrag({ data });

  return (
    <div className="flex flex-col gap-6 p-12">
      {/* Board header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Board
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Drag tasks between columns to update their status
          </p>
        </div>
      </div>

      {/* Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {KanbanBoardColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasksByColumn[column.id] ?? []}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
          {activeTask ? <TaskCard task={activeTask} overlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
