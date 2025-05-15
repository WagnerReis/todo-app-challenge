import { Button } from "./ui/button";

export function TaskInput() {
  return (
    <div className="w-full h-16 bg-muted-background rounded-lg pl-6 flex items-center gap-6 mt-10 mb-6">
      <Button checked onClick={() => console.log("clicou")} />
      <input
        type="text"
        placeholder="Create a new todo..."
        className="text-foreground py-2 outline-none w-full pr-8"
      />
    </div>
  );
}
