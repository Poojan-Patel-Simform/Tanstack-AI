import { TaskStatusEnum } from "@/types/kanban";
import z from "zod";

export const moveTaskInputSchema = z.object({
  taskId: z.string().min(1, "Task ID is required."),
  status: z.enum(TaskStatusEnum),
});

export const moveTaskOutputSchema = z.object({
  taskId: z.string(),
  title: z.string(),
  status: z.enum(TaskStatusEnum),
});

export type MoveTaskInput = z.infer<typeof moveTaskInputSchema>;
