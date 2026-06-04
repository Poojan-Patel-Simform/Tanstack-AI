"use server";

import prisma from "@/lib/prisma";

export const generateTaskId = async () => {
  const lastTask = await prisma.task.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      taskId: true,
    },
  });

  const nextNumber = lastTask ? Number(lastTask.taskId.split("-")[1]) + 1 : 1;

  return `TASK-${nextNumber}`;
};
