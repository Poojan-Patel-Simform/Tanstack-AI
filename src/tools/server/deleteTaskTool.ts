import { DELETE_TOOL_DESCRIPTION } from "@/constant/tool";
import prisma from "@/lib/prisma";
import {
  DeleteTaskInput,
  deleteTaskInputSchema,
  deleteTaskOutputSchema,
} from "@/schemas/deleteTaskSchema";
import { ToolNameEnum } from "@/types/tool";
import { toolDefinition } from "@tanstack/ai";

const deleteTaskDef = toolDefinition({
  name: ToolNameEnum.DELETE_TASK,
  description: DELETE_TOOL_DESCRIPTION,
  inputSchema: deleteTaskInputSchema,
  outputSchema: deleteTaskOutputSchema,
});

export const deleteTask = deleteTaskDef.server(
  async ({ taskId }: DeleteTaskInput) => {
    try {
      const deletedTask = await prisma.task.delete({
        where: { taskId: taskId.toUpperCase() },
      });

      return {
        taskId: deletedTask.taskId,
        title: deletedTask.title,
        deleted: true,
      };
    } catch (error) {
      console.log(error);

      throw new Error(
        error instanceof Error ? error.message : "Failed to delete task",
      );
    }
  },
);
