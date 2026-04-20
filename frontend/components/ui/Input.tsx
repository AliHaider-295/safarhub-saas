import type { ReactNode } from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** Decorative icon shown inside the field on the left */
  leftIcon?: ReactNode;
  /** e.g. password visibility toggle — placed inside the field on the right */
  rightSlot?: ReactNode;
};

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-base text-slate-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 sm:text-sm";

export default function Input({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  leftIcon,
  rightSlot,
}: Props) {
  const padL = leftIcon ? "pl-10" : "pl-3";
  const padR = rightSlot ? "pr-11" : "pr-3";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 sm:text-[0.9375rem]"
      >
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      <div className="relative">
        {leftIcon ? (
          <span
            className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-slate-400 [&_svg]:size-[1.125rem] [&_svg]:sm:size-4"
            aria-hidden
          >
            {leftIcon}
          </span>
        ) : null}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`${fieldClass} ${padL} ${padR}`}
        />
        {rightSlot ? (
          <div className="absolute right-2 top-1/2 z-[1] -translate-y-1/2">
            {rightSlot}
          </div>
        ) : null}
      </div>
    </div>
  );
}
