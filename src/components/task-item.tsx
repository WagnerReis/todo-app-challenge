import { X } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface TaskItemProps {
  id: string;
  checked?: boolean;
}

export function TaskItem({ id, checked = false }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="w-full h-16 bg-muted-background rounded-lg pl-6 flex items-center gap-6 cursor-custom"
    >
      <Button checked={checked} onClick={() => console.log("clicou")} />
      <span
        className={`text-foreground text-[12px] md:text-[18px] ${checked ? "line-through text-muted-foreground" : ""}`}
      >
        TaskItem
      </span>
      <button className="ml-auto mr-6 cursor-custom">
        <X size={24} weight="thin" />
      </button>
    </div>
  );
}
