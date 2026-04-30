"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ChartContainer({
  children,
  height = 260,
}: {
  children: ReactNode;
  height?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="w-full min-w-0">
      <div
        className="w-full min-w-0"
        style={{
          height,
          minHeight: height,
        }}
      >
        {!ready ? (
          <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}