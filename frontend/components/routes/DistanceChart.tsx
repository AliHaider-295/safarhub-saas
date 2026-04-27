"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function DistanceChart() {
  const data = [
    { name: "Short (<200km)", value: 6 },
    { name: "Medium (200-500km)", value: 10 },
    { name: "Long (>500km)", value: 4 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <h2 className="mb-3 font-semibold">Distance Distribution</h2>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}   // 🔥 makes it donut (modern UI)
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}

              {/* ✅ ALWAYS SHOW VALUES */}
              <LabelList
                dataKey="value"
                position="outside"
                className="text-xs fill-gray-700"
              />
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 Custom Legend (important for clarity) */}
      <div className="flex justify-center gap-4 mt-3 text-xs">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}