"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

import { getToken } from "@/utils/auth";
import ChartContainer from "@/components/common/ChartContainer";

type ChartData = {
  name: string;
  value: number;
};

export default function StaffStatusChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [mounted, setMounted] = useState(false);

  const COLORS = ["#22c55e", "#ef4444"];

  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/staff/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (!res.ok) return;

        setData([
          { name: "Active", value: Number(result?.active) || 0 },
          { name: "Inactive", value: Number(result?.inactive) || 0 },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full min-w-0">
      <h2 className="mb-3 font-semibold">Staff Status</h2>

      {/* 🔥 CRITICAL FIX */}
      <div className="w-full min-w-0">
        <ChartContainer height={260}>
          {!mounted ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Loading...
            </div>
          ) : total > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie data={data} dataKey="value">
                  {data.map((item) => (
                    <Cell
                      key={item.name}
                      fill={
                        item.name === "Active" ? "#22c55e" : "#ef4444"
                      }
                    />
                  ))}

                  <Label
                    value={`${total} Staff`}
                    position="center"
                    className="text-sm fill-gray-700 font-semibold"
                  />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No staff data available
            </div>
          )}
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-3 text-xs">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-gray-600">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}