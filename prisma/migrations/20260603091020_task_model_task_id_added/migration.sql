/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");
