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

const KanbanBoard = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const { activeTask, handleDragStart, handleDragEnd, tasksByColumn } =
    useKanbanDrag();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {KanbanBoardColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={tasksByColumn[column.id]}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
