import { TaskItem } from "./task-item";
import { Separator } from "./ui/separator";

export function TaskList() {
  return (
    <main className="w-full min-h-[440px] bg-muted-background rounded-lg">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <TaskItem />
          {index < 4 && <Separator />}
        </div>
      ))}
    </main>
  );
}
