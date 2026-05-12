"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "May 01", revenue: 150000 },
  { day: "May 06", revenue: 280000 },
  { day: "May 11", revenue: 260000 },
  { day: "May 16", revenue: 430000 },
  { day: "May 21", revenue: 360000 },
  { day: "May 26", revenue: 470000 },
];

export default function RevenueOverviewChart() {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-semibold mb-4">Revenue Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}