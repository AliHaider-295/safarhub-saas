"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function RouteChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/routes/usage", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ auth
          },
        });

        const result = await res.json();

        // ✅ Safety (avoid "not a function" error)
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Chart fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-3 font-semibold">Route Usage</h2>

      <div className="w-full h-[260px] min-h-[260px]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Loading...
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="route"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                }}
              />

              <Bar
                dataKey="trips"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              >
                <LabelList
                  dataKey="trips"
                  position="top"
                  className="text-xs fill-gray-700"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No route data available
          </div>
        )}
      </div>
    </div>
  );
}