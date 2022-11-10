import { Task } from "../../../Types/Task/task";
import prisma from "../../prisma/prisma";

export const api_tasks = {
  async getTasksByUserId(userId: string) {
    const tasks = prisma.tasks.findMany({
      where: {
        userId,
      },
    });

    return tasks;
  },

  async createTask(task: Task) {
    const taskCreated = await prisma.tasks.create({
      data: {
        id: task.id as string,
        title: task.title,
        userId: task.userId,
      },
    });

    return taskCreated;
  },

  async editTaskById(task: { id: string; title: string }) {
    const editedTask = prisma.tasks.update({
      where: {
        id: task.id,
      },
      data: {
        title: task.title,
      },
    });

    return editedTask;
  },

  async deleteTaskById(data: { id: string }) {
    const deletedTask = await prisma.tasks.delete({
      where: {
        id: data.id,
      },
    });

    return deletedTask;
  },

  async addTask(task: Task) {
    const createdTask = await prisma.tasks.create({
      data: task,
    });

    return createdTask;
  },
};
