import { TaskItem } from "./task-item";
import { Separator } from "./ui/separator";

export function TaskList() {
  return (
    <main className="w-full flex-grow bg-muted-background rounded-lg shadow-xl">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          {index % 2 === 0 ? <TaskItem /> : <TaskItem checked />}

          {index < 4 && <Separator />}
        </div>
      ))}
    </main>
  );
}
