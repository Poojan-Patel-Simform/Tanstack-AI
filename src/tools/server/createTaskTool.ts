import { generateTaskId } from "@/app/actions/task";
import { CREATE_TOOL_DESCRIPTION } from "@/constant/tool";
import prisma from "@/lib/prisma";
import {
  CreateTaskInput,
  createTaskInputSchema,
  createTaskOutputSchema,
} from "@/schemas/createTaskSchema";
import { PriorityEum, TaskStatusEnum } from "@/types/kanban";
import { ToolNameEnum } from "@/types/tool";
import { toolDefinition } from "@tanstack/ai";

const createTaskDef = toolDefinition({
  name: ToolNameEnum.CREATE_TASK,
  description: CREATE_TOOL_DESCRIPTION,
  inputSchema: createTaskInputSchema,
  outputSchema: createTaskOutputSchema,
});

export const createTask = createTaskDef.server(
  async (task: CreateTaskInput) => {
    try {
      const taskId = await generateTaskId();

      const newTask = await prisma.task.create({
        data: {
          taskId,
          title: task.title ?? "",
          description: task.description,
          status: task.status ?? TaskStatusEnum.BACKLOG,
          priority: task.priority ?? PriorityEum.MEDIUM,
          storyPoints: task.storyPoints ?? 5,
        },
      });

      return {
        ...newTask,
        description: newTask.description ?? "",
        storyPoints: newTask.storyPoints,
        status: newTask.status as TaskStatusEnum,
        priority: newTask.priority as PriorityEum,
      };
    } catch (error) {
      console.log(error);

      throw new Error(
        error instanceof Error ? error.message : "Failed to create task",
      );
    }
  },
);
