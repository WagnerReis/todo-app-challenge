import HomeContent from "@/components/home-content";
import { TaskProvider } from "@/contexts/task-context";

export default function Home() {
  return (
    <main className="bg-background object-cover w-full h-screen flex flex-col">
      <TaskProvider>
        <HomeContent />
      </TaskProvider>
    </main>
  );
}
