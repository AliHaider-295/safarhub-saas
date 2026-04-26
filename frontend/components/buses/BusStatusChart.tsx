"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function BusStatusChart({ buses = [] }: { buses?: any[] }) {
  // ✅ Calculate counts
  const active = buses.filter((b) => b.status === "ACTIVE").length;
  const maintenance = buses.filter((b) => b.status === "MAINTENANCE").length;
  const inactive = buses.filter((b) => b.status === "INACTIVE").length;

  const data = [
    { name: "Active", value: active },
    { name: "Maintenance", value: maintenance },
    { name: "Inactive", value: inactive },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <h2 className="mb-2 font-semibold">Bus Status Overview</h2>
      <div className="w-full h-full min-w-0">
      <ResponsiveContainer  width="100%" height="100%">
        <PieChart>
        <Pie
  data={data}
  dataKey="value"
  innerRadius={50}
  outerRadius={80}
  paddingAngle={3}
  labelLine={false}
  label={({ name, value }) => `${name}: ${value}`}
>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}