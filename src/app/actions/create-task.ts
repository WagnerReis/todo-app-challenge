"use server";

import Task from "@/lib/models/Task";

interface CreateTaskInput {
  description: string;
  completed: boolean;
}

interface PrevStateProps {
  error?: string;
  success?: string;
}

export async function createTask(prevState: PrevStateProps, formData: FormData) {
  try {
    const description = formData.get("description")?.toString().trim();
    const checked = formData.get('checked') === 'on';

    if (!description) {
      return {
        ...prevState,
        error: "Campo obrigatório!"
      };
    }

    const task: CreateTaskInput = {
      description,
      completed: checked,
    };

    console.log("creating task...");

    await Task.create(task);

    console.log("task created successfully");

    return { success: "Tarefa criada com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return { error: "Erro ao criar tarefa" };
  }
}