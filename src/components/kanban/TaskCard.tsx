import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types/kanban";
import type { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

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
  return (
    <Card
      {...attributes}
      {...listeners}
      className={`
        cursor-grab
        select-none
        ${dragging ? "opacity-40" : ""}
        ${overlay ? "shadow-xl" : ""}
      `}
    >
      <CardContent className="p-4">{task.title}</CardContent>
    </Card>
  );
};

export default TaskCard;
