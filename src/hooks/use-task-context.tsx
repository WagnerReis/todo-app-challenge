"use client";

import { TaskContext } from "@/contexts/task-context";
import { useContext } from "react";

export function useTaskContext() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("useTaskContext should be use inside a TaskProvider");
  }

  return context
}