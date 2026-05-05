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

import ChartContainer from "@/components/common/ChartContainer";
import { authFetch } from "@/lib/api"; // ✅ added

type RouteData = {
  route: string;
  trips: number;
};

export default function RouteChart() {
  const [data, setData] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        // ✅ FIXED
        const res = await authFetch("/routes/usage");

        if (!res.ok) {
          throw new Error("Failed to fetch route usage");
        }

        const result = await res.json();

        setData(Array.isArray(result) ? result : []);

      } catch (error) {
        console.error("Chart fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full min-w-0">
      <h2 className="mb-3 font-semibold">Route Usage</h2>

      <ChartContainer height={260}>
        {!mounted || loading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Loading...
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="route" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trips" fill="#3b82f6">
                <LabelList dataKey="trips" position="top" />
              </Bar>
            </BarChart>
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