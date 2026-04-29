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

  useEffect(() => {
    fetch("http://localhost:5000/api/routes/distance-stats")
      .then((res) => res.json())
      .then((res) => setData(res || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-3 font-semibold">Distance Distribution</h2>

      <div className="w-full h-[260px] min-h-[260px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {data.map((item, i) => (
                  <Cell
                    key={`${item.name}-${i}`} // ✅ FIXED KEY
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}

                <LabelList
                  dataKey="value"
                  position="outside"
                  className="text-xs fill-gray-700"
                />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}