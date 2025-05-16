'use client';
import { createTask } from "@/app/actions/create-task";
import { useActionState } from "react";
import { CheckFat } from "@phosphor-icons/react";
import { useRef } from "react";
import { useTaskContext } from "@/hooks/use-task-context";

export function TaskInput() {
  const { addTaskLocaly } = useTaskContext();
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (state: { error: string; success?: string } | { success: string }, formData: FormData) => {
    const description = formData.get("description") as string;
    const checked = formData.has("checked");

    if (description && description.trim() !== "") {
      const tempId = `temp-${Date.now()}`;

      addTaskLocaly({
        id: tempId,
        description: description.trim(),
        checked: checked
      });

      formRef.current?.reset();
    }

    return createTask({ error: "", success: "" }, formData);
  };

  const [state, formAction] = useActionState(clientAction, { error: "", success: "" });

  return (
    <form
      ref={formRef}
      action={formAction}
      className="w-full h-16 bg-muted-background rounded-lg px-6 flex items-center gap-6 mt-1 mb-6"
    >
      <label className="relative w-6 h-6">
        <input
          type="checkbox"
          name="checked"
          className="peer appearance-none w-6 h-6 border-2 border-gray-300 dark:border-gray-600 checked:border-none rounded-full checked:bg-gradient-to-br from-[var(--brand-start)] to-[var(--brand-end)]"
        />
        <CheckFat
          size={12}
          color="#fff"
          weight="fill"
          className="absolute inset-0 w-4 h-4 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity"
        />
      </label>
      <input
        type="text"
        name="description"
        placeholder="Create a new todo..."
        className="text-foreground py-2 outline-none w-[calc(100%-3rem)] text-[12px] md:text-[18px]"
      />
      <button type="submit" className="text-xl cursor-pointer">{">"}</button>
    </form>
  );
}