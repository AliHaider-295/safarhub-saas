"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Active", value: 18 },
  { name: "Maintenance", value: 3 },
  { name: "Inactive", value: 3 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function BusStatusChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm sm:text-base">
          Bus Status Overview
        </h2>

        <select className="text-xs border rounded px-2 py-1">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-around mt-3 text-xs">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}