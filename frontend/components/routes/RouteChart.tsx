"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RouteChart() {
  const data = [
    { route: "KHI → LHR", trips: 20 },
    { route: "LHR → ISB", trips: 15 },
    { route: "ISB → MUL", trips: 10 },
    { route: "KHI → HYD", trips: 8 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <h2 className="mb-2 font-semibold">Route Usage</h2>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="route" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trips" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}