import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KanbanColumnEnum, Task } from "@/types/kanban";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableTask from "./SortableTask";

type PropsType = {
  id: KanbanColumnEnum;
  title: string;
  tasks: Task[];
};

const KanbanColumn = ({ id, title, tasks }: PropsType) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <Card
      ref={setNodeRef}
      className={`min-h-125 ${isOver ? "border-primary" : ""}`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={rectSortingStrategy}
        >
          <div className="space-y-2">
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
