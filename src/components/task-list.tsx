"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavbarStatus } from "./navbar-status";
import { TaskItem } from "./task-item";
import { Separator } from "./ui/separator";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Task {
  id: string;
  checked: boolean;
}

const data = [
  { id: "1", checked: false },
  { id: "2", checked: true },
  { id: "3", checked: false },
  { id: "4", checked: true },
  { id: "5", checked: false },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(data);
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((task) => task.id === active.id);
        const newIndex = items.findIndex((task) => task.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <main>
      <div className="w-full flex flex-col bg-muted-background rounded-lg shadow-xl overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div>
              {tasks.map((task, index) => (
                <>
                  <TaskItem key={task.id} id={task.id} checked={task.checked} />
                  {index < tasks.length - 1 && <Separator />}
                </>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <footer className="flex justify-between h-12 w-full">
          <span className="text-[14px] w-[250px] pl-6 flex items-center text-gray-400">
            5 items left
          </span>
          {!isMobile && <NavbarStatus />}
          <button className="w-[250px] pr-6 flex items-center justify-end cursor-custom">
            <span className="text-[14px] text-foreground hover:text-muted-foreground">
              Clear Completed
            </span>
          </button>
        </footer>
      </div>

      {isMobile && <NavbarStatus />}
    </main>
  );
}
