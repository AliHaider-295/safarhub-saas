"use client";
import { authFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartContainer from "@/components/common/ChartContainer";

type ChartData = {
  day: string;
  income: number;
  expense: number;
};

export default function RevenueChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch("/dashboard/chart");
  
        if (!res.ok) {
          throw new Error("Failed to fetch chart data");
        }
  
        const result = await res.json();
  
        setData(Array.isArray(result) ? result : []);
  
      } catch (err) {
        console.error("Chart fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full min-w-0">
      <h2 className="mb-3 font-semibold">
        Weekly Income vs Expense
      </h2>

      {/* ✅ FIXED: stable height + safe render */}
      <ChartContainer height={260}>
        {!loading && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />

              <Bar
                dataKey="income"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="expense"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {loading ? "Loading chart..." : "No data available"}
          </div>
        )}
      </ChartContainer>
    </div>
  );
}