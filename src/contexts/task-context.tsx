"use client";

import { getTasks } from "@/app/actions/get-tasks";
import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";

export type TaskContextType = {
  tasks: TaskProps[];
  setTasks: Dispatch<React.SetStateAction<TaskProps[]>>;
  setQuery: (status: QueryOptions) => void;
  addTaskLocaly: (newTask: TaskProps) => void;
  deleteTaskLocaly: (taskId: string) => void;
  refreshTasks: () => Promise<void>;
  toggleStatusTaskLocaly: (taskId: string) => void;
  clearCompletedTasks: () => void;
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

type QueryOptions = "All" | "Active" | "Completed";

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [query, setQuery] = useState<QueryOptions>("All")

  function addTaskLocaly(newTask: TaskProps) {
    setTasks(state => [...state, newTask])
  }

  function deleteTaskLocaly(taskId: string) {
    setTasks(state => {
      state = tasks.filter(task => task.id !== taskId)
      return state
    })
  }

  function toggleStatusTaskLocaly(taskId: string) {
    setTasks(state => {
      state = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, checked: !task.checked }
        }
        return task
      })
      return state
    })
  }

  function clearCompletedTasks() {
    setTasks(state => {
      state = tasks.filter(task => !task.checked)
      return state
    })
  }

  const refreshTasks = async () => {
    const tasksData = await getTasks(query);

    const formattedTasks = tasksData.map(task => ({
      id: task.id as string,
      checked: task.checked || false,
      description: task.description
    }));

    setTasks(formattedTasks);
  };

  useEffect(() => {
    refreshTasks()
  }, [query])


  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks,
      setQuery,
      addTaskLocaly,
      deleteTaskLocaly,
      refreshTasks,
      toggleStatusTaskLocaly,
      clearCompletedTasks
    }}>{children}</TaskContext.Provider>
  )
}
