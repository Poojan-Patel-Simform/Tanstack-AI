import z from "zod";

export const deleteTaskInputSchema = z.object({
  taskId: z.string().min(1, "Task ID is required."),
});

export const deleteTaskOutputSchema = z.object({
  taskId: z.string(),
  title: z.string(),
  deleted: z.boolean(),
});

export type DeleteTaskInput = z.infer<typeof deleteTaskInputSchema>;
