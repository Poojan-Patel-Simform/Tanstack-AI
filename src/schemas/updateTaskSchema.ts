import { PriorityEum, TaskStatusEnum } from "@/types/kanban";
import z from "zod";

export const updateTaskInputSchema = z.object({
  taskId: z.string().min(1, "Task ID is required."),
  title: z.string().nullish(),
  description: z.string().nullish(),
  status: z.enum(TaskStatusEnum).nullish(),
  priority: z.enum(PriorityEum).nullish(),
  storyPoints: z.number().min(1).max(10).nullish(),
});

export const updateTaskOutputSchema = z.object({
  taskId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(TaskStatusEnum),
  priority: z.enum(PriorityEum),
  storyPoints: z.number(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
