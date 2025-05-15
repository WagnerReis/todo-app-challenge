"use client";
import { useIsMobile } from "@/hooks/use-mobile";

const statusOptions = ["All", "Active", "Completed"];

const baseClass =
  "text-[14px] text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 active:text-blue-600 dark:active:text-blue-600 cursor-custom";

function NavItem({ label }: { label: string }) {
  return <span className={baseClass}>{label}</span>;
}

export function NavbarStatus() {
  const isMobile = useIsMobile();

  const mobileBaseClass = isMobile ? "bg-muted-background mt-4 rounded-lg" : "";

  return (
    <nav
      className={`w-full h-12 flex gap-[18px] justify-center items-center ${mobileBaseClass}`}
    >
      {statusOptions.map((status) => (
        <NavItem key={status} label={status} />
      ))}
    </nav>
  );
}
