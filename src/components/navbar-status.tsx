const statusOptions = ["All", "Active", "Completed"];

const baseClass =
  "text-[14px] text-gray-400 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 active:text-blue-600 dark:active:text-blue-600 cursor-custom";

function NavItem({ label }: { label: string }) {
  return <span className={baseClass}>{label}</span>;
}

export function NavbarStatus() {
  return (
    <nav className="w-full h-12 flex gap-[18px] justify-center items-center">
      {statusOptions.map((status) => (
        <NavItem key={status} label={status} />
      ))}
    </nav>
  );
}
