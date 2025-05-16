"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavbarStatus } from "./navbar-status";
import { TaskItem } from "./task-item";
import { Separator } from "./ui/separator";

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
import { useTaskContext } from "@/hooks/use-task-context";
import { Fragment } from "react";

export interface Task {
  id: string;
  description: string;
  checked: boolean;
}

export function TaskList() {
  const { tasks, setTasks, clearCompletedTasks } = useTaskContext();
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
      setTasks((items: Task[]) => {
        const oldIndex = items.findIndex((task: Task) => task.id === active.id);
        const newIndex = items.findIndex((task: Task) => task.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const itemsLeft = tasks.filter((task) => !task.checked).length;

  return (
    <main>
      <div className="w-full min-h-[368px] flex flex-col bg-muted-background rounded-lg shadow-xl overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div>
              {tasks.map((task, index) => (
                <Fragment key={task.id}>
                  <TaskItem id={task.id} task={task} />
                  {index !== tasks.length - 1 && <Separator />}
                </Fragment>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <footer className="flex flex-col mt-auto">
          <Separator />
          <div className="flex justify-between h-12 w-full">
            <span className="text-[14px] w-[250px] pl-6 flex items-center text-gray-400">
              {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
            </span>
            {!isMobile && <NavbarStatus />}
            <button className="w-[250px] pr-6 flex items-center justify-end cursor-custom" onClick={clearCompletedTasks}>
              <span className="text-[14px] text-foreground hover:text-muted-foreground">
                Clear Completed
              </span>
            </button>
          </div>
        </footer>
      </div>

      {isMobile && <NavbarStatus />}
    </main >
  );
}
