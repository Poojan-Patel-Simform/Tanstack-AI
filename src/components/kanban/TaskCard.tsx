import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types/kanban";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { cn } from "@/lib/utils";
import { PRIORITY_CONFIG } from "@/constant/kanban";

type PropsType = {
  task: Task;
  overlay?: boolean;
  dragging?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
};

const TaskCard = ({
  task,
  overlay = false,
  dragging = false,
  attributes,
  listeners,
}: PropsType) => {
  const p = PRIORITY_CONFIG[task.priority];

  return (
    <Card
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab select-none group transition-all duration-150",
        "hover:-translate-y-px hover:shadow-sm",
        dragging && "opacity-40 cursor-grabbing",
        overlay && "shadow-xl rotate-1 cursor-grabbing ring-1 ring-primary/20",
      )}
    >
      <CardContent className="p-3.5 space-y-2.5">
        {/* Top row: taskId + priority badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-muted-foreground">
            {task.taskId}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-full",
              p.badge,
              p.text,
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", p.dot)} />
            {p.label}
          </span>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-foreground leading-snug">
          {task.title}
        </p>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Bottom row: story points */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] text-muted-foreground">
            {task.storyPoints} {task.storyPoints === 1 ? "pt" : "pts"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
