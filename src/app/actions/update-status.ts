"use server";

import Task from "@/lib/models/Task";

export async function updateStatus(taskId: string, newStatus: boolean) {
  try {
    await Task.findByIdAndUpdate(taskId, { completed: newStatus });
  } catch (err) {
    console.log("Erro ao atualizar o status.", err);
  }
} 