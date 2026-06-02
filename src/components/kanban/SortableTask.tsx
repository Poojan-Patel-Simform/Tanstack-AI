import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { Task } from "@/types/kanban";

type PropsType = {
  task: Task;
};

const SortableTask = ({ task }: PropsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        dragging={isDragging}
        attributes={attributes}
        listeners={listeners}
      />
    </div>
  );
};

export default SortableTask;
