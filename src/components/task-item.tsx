import { DotsSixVertical, X } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Task } from "./task-list";
import { deleteTask } from "@/app/actions/delete-task";
import { useTaskContext } from "@/hooks/use-task-context";
import { updateStatus } from "@/app/actions/update-status";

interface TaskItemProps {
  id: string;
  task: Task;
}

export function TaskItem({ id, task }: TaskItemProps) {
  const { deleteTaskLocaly, toggleStatusTaskLocaly } = useTaskContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function handleDeleteTask(taskId: string) {
    try {
      deleteTaskLocaly(taskId);
      await deleteTask(taskId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="w-full h-16 bg-muted-background rounded-lg pl-2 flex items-center"
    >
      <DotsSixVertical size={24} {...listeners} className="cursor-custom text-muted-foreground" />
      <Button checked={task.checked} onClick={async () => {
        toggleStatusTaskLocaly(task.id)
        await updateStatus(task.id, !task.checked)
      }} />
      <div {...listeners} className="w-[calc(100%-6rem)] h-full flex items-center cursor-custom ml-3">
        <span
          className={`text-foreground text-[12px] md:text-[18px] ${task.checked ? "line-through text-muted-foreground" : ""
            }`}
        >
          {task.description}
        </span>
      </div>
      <button
        className="ml-auto mr-6 cursor-custom"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTask(task.id)
        }}
        type="button"
      >
        <X size={24} weight="thin" />
      </button>
    </div>
  );
}
