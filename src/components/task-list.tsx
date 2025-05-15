import { useIsMobile } from "@/hooks/use-mobile";
import { NavbarStatus } from "./navbar-status";
import { TaskItem } from "./task-item";
import { Separator } from "./ui/separator";

export function TaskList() {
  const isMobile = useIsMobile();

  return (
    <main>
      <div className="w-full flex flex-col bg-muted-background rounded-lg shadow-xl overflow-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            {index % 2 === 0 ? <TaskItem /> : <TaskItem checked />}

            {index < 4 && <Separator />}
          </div>
        ))}
        <footer className="flex justify-between h-12 w-full">
          <span className="text-[14px] w-[250px] pl-6 flex items-center text-gray-400">
            5 items left
          </span>
          {!isMobile && <NavbarStatus />}
          <button className="cursor-custom text-[14px] text-foreground w-[250px] pr-6 flex items-center justify-end">
            Clear Completed
          </button>
        </footer>
      </div>

      {isMobile && <NavbarStatus />}
    </main>
  );
}
