"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

import ChartContainer from "@/components/common/ChartContainer";
import { authFetch } from "@/lib/api";

type TrendData = {
  month: string;
  staff: number;
};

export default function StaffTrendChart({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [mounted, setMounted] = useState(false);

  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    setMounted(true);

    const fetchTrend = async () => {
      try {
        const res = await authFetch("/staff/trend");

        const result = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch trend data");
        }

        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Trend fetch error:", error);
      }
    };

    fetchTrend();
  }, [refreshKey]);

  const totalGrowth = data.reduce(
    (sum, item) => sum + item.staff,
    0
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800">
          Staff Growth
        </h2>

        <span className="text-xs text-gray-500">
          Total Added: {totalGrowth}
        </span>
      </div>

      {/* Chart */}
      <div className="w-full min-w-0">
        <ChartContainer height={260}>
          {!mounted ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              Loading...
            </div>
          ) : data.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
            >
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />

                <YAxis tick={{ fontSize: 12 }} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="staff"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              No trend data available
            </div>
          )}
        </ChartContainer>
      </div>
    </div>
  );
}