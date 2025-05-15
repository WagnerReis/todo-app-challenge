import { X } from "@phosphor-icons/react";
import { Button } from "./ui/button";

interface TaskItemProps {
  checked?: boolean;
}

export function TaskItem({ checked = false }: TaskItemProps) {
  return (
    <div className="w-full h-16 bg-muted-background rounded-lg pl-6 flex items-center gap-6">
      <Button checked={checked} onClick={() => console.log("clicou")} />
      <span
        className={`text-foreground text-[12px] cursor-custom ${checked ? "line-through text-muted-foreground" : ""}`}
      >
        TaskItem
      </span>
      <button className="ml-auto mr-6 cursor-custom">
        <X size={24} weight="thin" />
      </button>
    </div>
  );
}
