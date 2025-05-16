"use server";
import { Task as TaskProps } from "@/components/task-list";
import Task, { ITask } from "@/lib/models/Task";

export async function getTasks() {
  try {
    const tasks = await Task.find().lean().exec();
    return getTasksMapper(tasks as unknown as ITask[]);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return [];
  }
}

function getTasksMapper(task: ITask[]): TaskProps[] {
  return task.map((task) => ({
    id: task._id?.toString() || '',
    description: task.description,
    checked: task.completed,
  }));
}
