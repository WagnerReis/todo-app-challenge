"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import iconMoon from "../assets/icon-moon.svg";
import iconSun from "../assets/icon-sun.svg";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center bg-transparent cursor-pointer"
    >
      {theme === "light" ? (
        <Image src={iconMoon} alt="" width={26} height={26} />
      ) : (
        <Image src={iconSun} alt="" width={26} height={26} />
      )}
    </button>
  );
}
