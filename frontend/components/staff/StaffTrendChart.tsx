"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartContainer from "@/components/common/ChartContainer";

export default function StaffTrendChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { id: "jan", month: "Jan", staff: 140 },
    { id: "feb", month: "Feb", staff: 155 },
    { id: "mar", month: "Mar", staff: 170 },
    { id: "apr", month: "Apr", staff: 185 },
    { id: "may", month: "May", staff: 196 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full min-w-0">
      <h2 className="mb-3 font-semibold">Staff Growth</h2>

      {/* ✅ CRITICAL FIX */}
      <div className="min-w-0 w-full">
        <ChartContainer height={260}>
          {!mounted ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Loading...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="staff"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </div>
    </div>
  );
}