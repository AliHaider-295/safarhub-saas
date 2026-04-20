import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};

export default function Button({
  children,
  type = "button",
  disabled,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 sm:text-base"
    >
      {children}
    </button>
  );
}
