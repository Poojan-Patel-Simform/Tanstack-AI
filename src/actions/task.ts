"use server";

import prisma from "@/lib/prisma";
import {
  PriorityEum,
  Task,
  TaskStatusEnum,
  UpdateTaskStatusInput,
} from "@/types/kanban";
import { Prisma } from "../../prisma/generated/prisma/client";
import { REBALANCE_GAP, REBALANCE_THRESHOLD } from "@/constant/common";
import { revalidatePath } from "next/cache";

const formatTaskResponse = (task: Prisma.TaskModel): Task => {
  return {
    id: task.id,
    taskId: task.taskId,
    title: task.title,
    description: task.description ?? "",
    status: task.status as TaskStatusEnum,
    priority: task.priority as PriorityEum,
    storyPoints: task.storyPoints,
    order: task.order,
    createdAt: task.createdAt.toString(),
    updatedAt: task.updatedAt.toString(),
  };
};

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

export const getTasks = async () => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        order: "desc",
      },
    });

    const formattedTaskList = tasks.map((task) => formatTaskResponse(task));

    return {
      success: true,
      data: formattedTaskList,
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch tasks",
      data: [],
    };
  }
};

const rebalanceColumn = async (status: TaskStatusEnum) => {
  const tasks = await prisma.task.findMany({
    where: { status },
    orderBy: { order: "asc" },
    select: { id: true },
  });

  await prisma.$transaction(
    tasks.map((task, index) =>
      prisma.task.update({
        where: { id: task.id },
        data: { order: (index + 1) * REBALANCE_GAP },
      }),
    ),
  );
};

export const updateTaskStatus = async ({
  sourceTask,
  newStatus,
  prevOrder,
  nextOrder,
}: UpdateTaskStatusInput) => {
  let newOrder: number;

  if (prevOrder === null && nextOrder === null) {
    // Only task in the column
    newOrder = REBALANCE_GAP;
  } else if (prevOrder === null) {
    // Dropped at the top
    newOrder = nextOrder! - REBALANCE_GAP / 2;
  } else if (nextOrder === null) {
    // Dropped at the bottom
    newOrder = prevOrder + REBALANCE_GAP;
  } else {
    // Dropped between two tasks — midpoint
    newOrder = (prevOrder + nextOrder) / 2;
  }

  // Check if rebalance needed before updating
  const needsRebalance =
    prevOrder !== null &&
    nextOrder !== null &&
    Math.abs(nextOrder - prevOrder) < REBALANCE_THRESHOLD;

  await prisma.task.update({
    where: { id: sourceTask.id },
    data: {
      order: newOrder,
      status: newStatus,
    },
  });

  if (needsRebalance) {
    await rebalanceColumn(newStatus);
  }

  revalidatePath("/");
};
