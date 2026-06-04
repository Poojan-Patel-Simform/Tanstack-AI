import { MOVE_TOOL_DESCRIPTION } from "@/constant/tool";
import prisma from "@/lib/prisma";
import {
  MoveTaskInput,
  moveTaskInputSchema,
  moveTaskOutputSchema,
} from "@/schemas/moveTaskSchema";
import { PriorityEum, TaskStatusEnum } from "@/types/kanban";
import { ToolNameEnum } from "@/types/tool";
import { toolDefinition } from "@tanstack/ai";

const moveTaskDef = toolDefinition({
  name: ToolNameEnum.MOVE_TASK,
  description: MOVE_TOOL_DESCRIPTION,
  inputSchema: moveTaskInputSchema,
  outputSchema: moveTaskOutputSchema,
});

export const moveTask = moveTaskDef.server(
  async ({ taskId, status }: MoveTaskInput) => {
    try {
      const updatedTask = await prisma.task.update({
        where: { taskId: taskId.toUpperCase() },
        data: { status },
      });

      return {
        ...updatedTask,
        description: updatedTask.description ?? "",
        storyPoints: updatedTask.storyPoints,
        status: updatedTask.status as TaskStatusEnum,
        priority: updatedTask.priority as PriorityEum,
        createdAt: updatedTask.createdAt.toString(),
        updatedAt: updatedTask.updatedAt.toString(),
      };
    } catch (error) {
      console.log(error);

      throw new Error(
        error instanceof Error ? error.message : "Failed to move task",
      );
    }
  },
);
