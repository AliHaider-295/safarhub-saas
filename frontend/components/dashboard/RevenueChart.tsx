"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  day: string;
  income: number;
  expense: number;
};

export default function RevenueChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/chart")
      .then((res) => res.json())
      .then((data) => {
        console.log("Chart API Data:", data); // 🔥 ADD THIS
        setData(data);
      });
  }, []);
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-3 font-semibold">
        Weekly Income vs Expense
      </h2>

      {/* ✅ Responsive Height */}
      <div className="w-full h-[250px] min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
            />
            <Tooltip />

            {/* ✅ Income */}
            <Bar
              dataKey="income"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
            />

            {/* ✅ Expense */}
            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}