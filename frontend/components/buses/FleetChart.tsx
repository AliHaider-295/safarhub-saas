"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

import ChartContainer from "@/components/common/ChartContainer";

type Bus = {
  status: string;
  capacity: number;
};

export default function FleetChart({ buses = [] }: { buses?: Bus[] }) {
  // ✅ Safe calculations
  const active = buses
    .filter((b) => b.status === "ACTIVE")
    .reduce((sum, b) => sum + (b.capacity || 0), 0);

  const maintenance = buses
    .filter((b) => b.status === "MAINTENANCE")
    .reduce((sum, b) => sum + (b.capacity || 0), 0);

  const inactive = buses
    .filter((b) => b.status === "INACTIVE")
    .reduce((sum, b) => sum + (b.capacity || 0), 0);

  const data = [
    { name: "Active", capacity: active, color: "#22c55e" },
    { name: "Maintenance", capacity: maintenance, color: "#f59e0b" },
    { name: "Inactive", capacity: inactive, color: "#ef4444" },
  ].filter((item) => item.capacity > 0); // ✅ important

  const total = data.reduce((sum, item) => sum + item.capacity, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <h2 className="mb-3 font-semibold">Fleet Capacity by Status</h2>

      <p className="text-xs text-gray-500 mb-3">
        Total seat capacity distributed across bus statuses
      </p>

      {/* ✅ FIXED CONTAINER */}
      <ChartContainer>
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, "dataMax + 20"]} />
              <Tooltip />

              <Bar dataKey="capacity" radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`} // ✅ FIXED KEY
                    fill={entry.color}
                  />
                ))}

                <LabelList
                  dataKey="capacity"
                  position="top"
                  style={{ fontSize: 12, fill: "#374151" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No fleet data available
          </div>
        )}
      </ChartContainer>
    </div>
  );
}