"use client";

import { getTasks } from "@/app/actions/get-tasks";
import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";

export type TaskContextType = {
  tasks: TaskProps[];
  setTasks: Dispatch<React.SetStateAction<TaskProps[]>>;
  addTask: (newTask: TaskProps) => void;
  deleteTask: (taskId: string) => void;
  refreshTasks: () => Promise<void>;
}

interface TaskProviderProps {
  children: ReactNode;
}

interface TaskProps {
  id: string;
  description: string;
  checked: boolean;
}

export const TaskContext = createContext({} as TaskContextType)

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function addTask(newTask: TaskProps) {
    setTasks(state => [...state, newTask])
  }

  function deleteTask(taskId: string) {
    setTasks(state => {
      state = tasks.filter(task => task.id !== taskId)
      return state
    })
  }

  const refreshTasks = async () => {
    const tasksData = await getTasks();

    const formattedTasks = tasksData.map(task => ({
      id: task.id as string,
      checked: task.checked || false,
      description: task.description
    }));

    setTasks(formattedTasks);
  };

  useEffect(() => {
    refreshTasks()
  }, [])


  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, deleteTask, refreshTasks }}>{children}</TaskContext.Provider>
  )
}
