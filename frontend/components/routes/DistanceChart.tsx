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

import ChartContainer from "@/components/common/ChartContainer";

type DistanceData = {
  name: string;
  value: number;
};

export default function DistanceChart() {
  const [data, setData] = useState<DistanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/routes/distance-stats"
        );
        const result = await res.json();

        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Distance chart error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full min-w-0">
      <h2 className="mb-3 font-semibold">Distance Distribution</h2>

      {/* ✅ FIXED CONTAINER */}
      <ChartContainer height={260}>
  {!mounted || loading ? (
    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
      Loading...
    </div>
  ) : data.length > 0 ? (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80}>
          {data.map((item, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
      No data available
    </div>
  )}
</ChartContainer>
      
    </div>
  );
}