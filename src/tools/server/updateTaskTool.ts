import { UPDATE_TOOL_DESCRIPTION } from "@/constant/tool";
import prisma from "@/lib/prisma";
import {
  UpdateTaskInput,
  updateTaskInputSchema,
  updateTaskOutputSchema,
} from "@/schemas/updateTaskSchema";
import { PriorityEum, TaskStatusEnum } from "@/types/kanban";
import { ToolNameEnum } from "@/types/tool";
import { toolDefinition } from "@tanstack/ai";

const updateTaskDef = toolDefinition({
  name: ToolNameEnum.UPDATE_TASK,
  description: UPDATE_TOOL_DESCRIPTION,
  inputSchema: updateTaskInputSchema,
  outputSchema: updateTaskOutputSchema,
});

export const updateTask = updateTaskDef.server(
  async ({ taskId, ...fields }: UpdateTaskInput) => {
    try {
      // Strip undefined values so Prisma only updates provided fields
      const data = Object.fromEntries(
        Object.entries(fields).filter(([, v]) => v !== undefined),
      );

      const updatedTask = await prisma.task.update({
        where: { taskId: taskId.toUpperCase() },
        data,
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
        error instanceof Error ? error.message : "Failed to update task",
      );
    }
  },
);
