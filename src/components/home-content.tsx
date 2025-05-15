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

  if (!mounted) {
    return null;
  }

  return (
    <>
      <header>
        <Image
          src={backgroundImage}
          alt="header"
          priority
          className="w-full h-[300px] object-cover transition-opacity duration-500 opacity-100"
        />
      </header>
      <div className="w-full min-h-[calc(100vh-70px)] flex flex-col px-6 md:px-0 max-w-[540px] mx-auto mt-[-230px]">
        <div className="flex justify-between">
          <h1 className="top-[300px] text-white text-5xl font-bold tracking-[18px]">
            TODO
          </h1>
          <ThemeToggle />
        </div>
        <TaskInput />
        <TaskList />
        <footer className="text-center my-[52px]">
          <span className="bottom-[72px] md:bottom-[52px] left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 text-[14px]">
            Drag and drop to reorder list
          </span>
        </footer>
      </div>
    </>
  );
}
