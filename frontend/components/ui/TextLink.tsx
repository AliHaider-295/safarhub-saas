import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

const baseClass =
  "font-medium text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm";

export default function TextLink({ className, ...props }: Props) {
  return (
    <Link
      className={className ? `${baseClass} ${className}` : baseClass}
      {...props}
    />
  );
}
