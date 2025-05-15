import { CheckFat } from "@phosphor-icons/react";

type ButtonProps = {
  checked?: boolean;
  onClick: () => void;
  className?: string;
};

export function Button({
  checked = false,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      /* eslint-disable prettier/prettier */
      className={`w-6 h-6 rounded-full cursor-pointer ${checked
        ? "bg-gradient-to-br from-[var(--brand-start)] to-[var(--brand-end)] flex items-center justify-center"
        : "border-2 border-gray-300 dark:border-gray-600"
        } ${className}`}
      onClick={onClick}
    >
      {checked && <CheckFat size={12} color="#fff" weight="fill" />}
    </button>
  );
}
