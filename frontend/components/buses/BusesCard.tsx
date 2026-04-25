"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  type?: "total" | "active" | "maintenance" | "inactive" | "capacity";
};

export default function BusesCard({
  title,
  value,
  description,
  icon,
  type = "total",
}: Props) {
  const styles = {
    total: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: "text-blue-600",
      border: "border-blue-200",
    },
    active: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: "text-green-600",
      border: "border-green-200",
    },
    maintenance: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: "text-yellow-600",
      border: "border-yellow-200",
    },
    inactive: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: "text-red-600",
      border: "border-red-200",
    },
    capacity: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: "text-purple-600",
      border: "border-purple-200",
    },
  };

  const current = styles[type];

  return (
    <div
      className={cn(
        "rounded-xl p-4 flex items-center justify-between border shadow-sm transition hover:shadow-md",
        current.bg,
        current.border
      )}
    >
      <div>
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>

        <h2 className={cn("text-lg sm:text-xl font-semibold", current.text)}>
          {value}
        </h2>

        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>

      <div
        className={cn(
          "p-2 sm:p-3 rounded-lg bg-white shadow-sm",
          current.icon
        )}
      >
        {/* Responsive icon size */}
        <div className="w-5 h-5 sm:w-6 sm:h-6">{icon}</div>
      </div>
    </div>
  );
}