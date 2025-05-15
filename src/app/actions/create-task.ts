"use server";

import Task, { ITask } from "@/lib/models/Task";

export async function createTask() {
  try {
    const task: Partial<ITask> = {
      description: "Estudar react e nextjs",
      completed: false
    }

    console.log("creating task...");

    await Task.create(task);

    console.log("task created successfully");
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
}