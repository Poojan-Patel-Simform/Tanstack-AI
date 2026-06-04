import { PriorityEum, TaskStatusEnum } from "@/types/kanban";
import z from "zod";

export const createTaskInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(TaskStatusEnum).optional(),
  priority: z.enum(PriorityEum).optional(),
  storyPoints: z.number().min(1).max(10).optional(),
});

export const createTaskOutputSchema = z.object({
  taskId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(TaskStatusEnum),
  priority: z.enum(PriorityEum),
  storyPoints: z.number(),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
