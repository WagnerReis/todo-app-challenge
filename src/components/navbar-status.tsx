"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

type StatusType = "All" | "Active" | "Completed";

const statusOptions: StatusType[] = ["All", "Active", "Completed"];

const baseClass =
  "text-[14px] text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 cursor-custom font-bold";

interface NavItemProps {
  label: StatusType;
  selected: StatusType;
  onClick: () => void;
}

function NavItem({ label, onClick, selected }: NavItemProps) {
  console.log("la");
  return (
    <button
      className={`${baseClass} ${selected === label ? "text-violet-600 dark:text-violet-600" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function NavbarStatus() {
  const [selected, setIsSelected] = useState<StatusType>("All");
  const isMobile = useIsMobile();

  const mobileBaseClass = isMobile ? "bg-muted-background mt-4 rounded-lg" : "";

  return (
    <nav
      className={`w-full h-12 flex gap-[18px] justify-center items-center ${mobileBaseClass}`}
    >
      {statusOptions.map((status) => (
        <NavItem
          key={status}
          label={status}
          selected={selected}
          onClick={() => setIsSelected(status)}
        />
      ))}
    </nav>
  );
}
