"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { Task, TaskStatusEnum } from "@/types/kanban";
import SortableTask from "./SortableTask";
import { COLUMN_STYLES } from "@/constant/kanban";

type PropsType = {
  id: TaskStatusEnum;
  title: string;
  tasks: Task[];
};

const KanbanColumn = ({ id, title, tasks }: PropsType) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = COLUMN_STYLES[id];

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-xl border border-border/60 bg-muted/40 min-h-130 shadow-md",
        "border-t-4 transition-colors duration-150",
        style.accentBorder,
        isOver && "bg-muted/90 border-primary/30",
      )}
    >
      {/* Column header */}
      <div
        className={cn(
          "flex items-center justify-between px-3.5 py-3 border-b",
          style.headerLine,
        )}
      >
        <span className="text-sm font-semibold text-foreground tracking-tight">
          {title}
        </span>
        <span
          className={cn(
            "text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums",
            style.countBg,
            style.countText,
          )}
        >
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-col gap-2 p-2.5 flex-1">
          {tasks.length === 0 && (
            <div
              className={cn(
                "flex-1 flex items-center justify-center rounded-lg border border-dashed border-border/60",
                "text-xs text-muted-foreground/50 min-h-20",
                isOver && "border-primary/40 text-primary/50",
              )}
            >
              Drop here
            </div>
          )}
          {tasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
