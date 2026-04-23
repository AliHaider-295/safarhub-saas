"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useId, useState } from "react";

type Props = {
  id?: string;
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** "signup" uses new-password autocomplete default */
  variant?: "login" | "signup";
};

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-base text-slate-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 sm:text-sm";

export default function PasswordInput({
  id: idProp,
  name,
  label,
  placeholder,
  autoComplete: autoCompleteProp,
  required,
  variant = "login",
}: Props) {
  const genId = useId();
  const id = idProp ?? genId;
  const [visible, setVisible] = useState(false);
  const autoComplete =
    autoCompleteProp ??
    (variant === "signup" ? "new-password" : "current-password");

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
        <span
          className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-slate-400"
          aria-hidden
        >
          <Lock className="size-[1.125rem] sm:size-4" strokeWidth={2} />
        </span>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={fieldClass}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeOff className="size-[1.125rem] sm:size-4" strokeWidth={2} />
          ) : (
            <Eye className="size-[1.125rem] sm:size-4" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}