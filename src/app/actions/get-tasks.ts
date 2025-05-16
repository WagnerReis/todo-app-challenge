"use server";
import { Task as TaskProps } from "@/components/task-list";
import Task, { ITask } from "@/lib/models/Task";

const queryMap = {
  All: {},
  Active: { completed: false },
  Completed: { completed: true }
}

export async function getTasks(query: keyof typeof queryMap) {
  try {
    console.log(queryMap[query])
    const tasks = await Task.find(queryMap[query]).lean().exec();
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
