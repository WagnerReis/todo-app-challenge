"use server";

import Task from "@/lib/models/Task"

export async function deleteTask(taskId: string) {
  try {
    await Task.findByIdAndDelete(taskId)
  } catch (err) {
    console.log("Erro ao deletar task", err)
  }
}