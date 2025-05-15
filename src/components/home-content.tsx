"use client";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { getHeaderImage } from "@/utils/get-header-image";
import { useEffect, useState } from "react";

import imageDefault from "../assets/bg-desktop-light.jpg";
import { TaskList } from "./task-list";
import { TaskInput } from "./task-input";

export default function HomeContent() {
  const { theme = "light" } = useTheme();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  const [backgroundImage, setBackgroundImage] =
    useState<StaticImageData>(imageDefault);

  useEffect(() => {
    setBackgroundImage(getHeaderImage(theme as "light" | "dark", isMobile));
  }, [isMobile, theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[300px] z-0">
        <Image
          src={backgroundImage}
          alt="header"
          priority
          fill
          className="object-cover transition-opacity duration-500"
        />
      </div>

      <div className="relative mt-[-230px] z-10 min-h-screen flex flex-col items-center px-6 md:px-0 pt-[300px]">
        <div className="w-full max-w-[540px] flex flex-col flex-1">
          <div className="flex justify-between mb-10">
            <h1 className="text-white text-5xl font-bold tracking-[18px]">
              TODO
            </h1>
            <ThemeToggle />
          </div>

          <TaskInput />
          <TaskList />

          <footer className="mt-auto text-center pt-10 pb-20">
            <span className="text-gray-400 dark:text-gray-500 text-[14px]">
              Drag and drop to reorder list
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
