"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface CustomThemeProviderProps {
  children: ReactNode;
}

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="@todo-app-theme"
      themes={["dark", "light"]}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
