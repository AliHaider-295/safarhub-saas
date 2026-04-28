"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function StaffTrendChart() {
  const data = [
    { month: "Jan", staff: 140 },
    { month: "Feb", staff: 155 },
    { month: "Mar", staff: 170 },
    { month: "Apr", staff: 185 },
    { month: "May", staff: 196 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-3 font-semibold">Staff Growth</h2>

      <div className="w-full h-[250px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="staff" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}