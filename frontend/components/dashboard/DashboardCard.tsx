"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
  type?: "revenue" | "profit" | "passengers" | "buses";
};

export default function DashboardCard({
  title,
  value,
  icon,
  type = "revenue",
}: Props) {
  const styles = {
    revenue: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: "text-green-600",
      border: "border-green-200",
    },
    profit: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: "text-emerald-600",
      border: "border-emerald-200",
    },
    passengers: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: "text-purple-600",
      border: "border-purple-200",
    },
    buses: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: "text-blue-600",
      border: "border-blue-200",
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
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={cn("text-xl font-semibold", current.text)}>
          {value}
        </h2>
      </div>

      <div
        className={cn(
          "p-2 rounded-lg bg-white shadow-sm",
          current.icon
        )}
      >
        {icon}
      </div>
    </div>
  );
}