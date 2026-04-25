"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", trips: 12 },
  { day: "Tue", trips: 18 },
  { day: "Wed", trips: 10 },
  { day: "Thu", trips: 20 },
  { day: "Fri", trips: 25 },
  { day: "Sat", trips: 15 },
  { day: "Sun", trips: 8 },
];

export default function FleetChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm sm:text-base">
          Fleet Utilization
        </h2>

        <select className="text-xs border rounded px-2 py-1">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />
            <YAxis />

            <Tooltip />

            <Bar
              dataKey="trips"
              radius={[6, 6, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}