"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ChartContainer from "@/components/common/ChartContainer";

type Bus = {
  status: string;
};

export default function BusStatusChart({ buses = [] }: { buses?: Bus[] }) {
  // ✅ Safe calculations
  const active = buses.filter((b) => b.status === "ACTIVE").length;
  const maintenance = buses.filter((b) => b.status === "MAINTENANCE").length;
  const inactive = buses.filter((b) => b.status === "INACTIVE").length;

  const data = [
    { name: "Active", value: active },
    { name: "Maintenance", value: maintenance },
    { name: "Inactive", value: inactive },
  ].filter((item) => item.value > 0); // ✅ remove zero values (important)

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <h2 className="mb-3 font-semibold">Bus Status Overview</h2>

      <ChartContainer>
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((item, index) => (
                  <Cell
                    key={`cell-${item.name}`} // ✅ FIXED UNIQUE KEY
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No bus data available
          </div>
        )}
      </ChartContainer>
    </div>
  );
}