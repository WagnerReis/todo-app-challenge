"use server";

import Task from "@/lib/models/Task";
import { z } from "zod";

const CreateTaskSchema = z.object({
  description: z.string().min(3, "A descrição é obrigatória"),
  completed: z.boolean(),
});

type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

interface PrevStateProps {
  error?: string;
  success?: string;
}

export async function createTask(prevState: PrevStateProps, formData: FormData) {
  try {
    const raw = {
      description: formData.get("description")?.toString().trim(),
      completed: formData.get("checked") === "on",
    };

    const result = CreateTaskSchema.safeParse(raw);

    if (!result.success) {
      console.log(result.error.errors[0].message)
      return {
        ...prevState,
        error: result.error.errors[0].message
      };
    }

    const task: CreateTaskInput = {
      description: raw.description as string,
      completed: raw.completed as boolean,
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