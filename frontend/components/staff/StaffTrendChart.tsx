"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartContainer from "@/components/common/ChartContainer"; // ✅ IMPORTANT

export default function StaffTrendChart() {
  const data = [
    { id: "jan", month: "Jan", staff: 140 },
    { id: "feb", month: "Feb", staff: 155 },
    { id: "mar", month: "Mar", staff: 170 },
    { id: "apr", month: "Apr", staff: 185 },
    { id: "may", month: "May", staff: 196 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <h2 className="mb-3 font-semibold">Staff Growth</h2>

      {/* ✅ THIS FIXES EVERYTHING */}
      <ChartContainer height={260}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="staff" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}