"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  height?: number; // optional custom height
};

export default function ChartContainer({ children, height = 300 }: Props) {
  return (
    <div
      className="w-full min-w-0"
      style={{
        height: `${height}px`,     // ✅ FIXED HEIGHT
        minHeight: `${height}px`,  // ✅ PREVENT COLLAPSE
      }}
    >
      {children}
    </div>
  );
}