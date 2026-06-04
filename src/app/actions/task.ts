"use server";

import { CACHE_KEYS } from "@/constant/cache";
import prisma from "@/lib/prisma";
import { TaskStatusEnum } from "@/types/kanban";
import { cacheLife, cacheTag, updateTag } from "next/cache";

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
  "use cache";
  cacheTag(CACHE_KEYS.GET_TASKS);

  try {
    const tasks = await prisma.task.findMany({});

    return {
      success: true,
      data: tasks,
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch tasks",
      data: [],
    };
  }
};

export const updateStatus = async (
  targetTaskId: string,
  status: TaskStatusEnum,
) => {
  try {
    await prisma.task.update({
      where: { id: targetTaskId },
      data: {
        status,
      },
    });

    updateTag(CACHE_KEYS.GET_TASKS);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to update status",
    };
  }
};

export const syncStatus = async (sourceId: string, targetId: string) => {
  try {
    const targetTask = await prisma.task.findFirst({ where: { id: targetId } });

    if (!targetTask) {
      return {
        success: false,
        error: "Failed to update status",
      };
    }

    await prisma.task.update({
      where: { id: sourceId },
      data: { status: targetTask.status },
    });

    updateTag(CACHE_KEYS.GET_TASKS);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to update status",
    };
  }
};
