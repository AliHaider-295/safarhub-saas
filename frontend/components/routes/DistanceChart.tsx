"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function DistanceChart() {
  const [data, setData] = useState<any[]>([]);

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  // ✅ Fetch from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/routes/distance-stats")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <h2 className="mb-3 font-semibold">Distance Distribution</h2>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}

              {/* ✅ Always show values */}
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

      {/* Legend */}
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