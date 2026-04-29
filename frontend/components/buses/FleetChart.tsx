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

export default function FleetChart({ buses = [] }: { buses?: any[] }) {

  const active = buses
    .filter((b) => b.status === "ACTIVE")
    .reduce((sum, b) => sum + b.capacity, 0);

  const maintenance = buses
    .filter((b) => b.status === "MAINTENANCE")
    .reduce((sum, b) => sum + b.capacity, 0);

  const inactive = buses
    .filter((b) => b.status === "INACTIVE")
    .reduce((sum, b) => sum + b.capacity, 0);

  const data = [
    { name: "Active", capacity: active, color: "#22c55e" },
    { name: "Maintenance", capacity: maintenance, color: "#f59e0b" },
    { name: "Inactive", capacity: inactive, color: "#ef4444" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-3 font-semibold">Fleet Capacity by Status</h2>

      <p className="text-xs text-gray-500 mb-3">
        Total seat capacity distributed across bus statuses
      </p>

      <div className="w-full h-[250px] min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
  <BarChart 
    data={data}
    margin={{ top: 20, right: 20, left: 0, bottom: 10 }} // ✅ space for labels
  >
    <XAxis dataKey="name" />
    
    {/* ✅ Add headroom so labels don’t cut */}
    <YAxis domain={[0, "dataMax + 20"]} />

    <Tooltip />

    <Bar dataKey="capacity" radius={[6, 6, 0, 0]}>
      
      {data.map((entry, index) => (
        <Cell key={index} fill={entry.color} />
      ))}

      {/* ✅ Always visible labels */}
      <LabelList 
        dataKey="capacity" 
        position="top"
        style={{ fontSize: "12px", fill: "#374151" }}
      />

    </Bar>
  </BarChart>
</ResponsiveContainer>
      </div>
    </div>
  );
}