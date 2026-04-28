"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";

export default function StaffStatusChart() {
  const data = [
    { name: "Active", value: 162 },
    { name: "Inactive", value: 34 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="mb-3 font-semibold text-gray-800">
        Staff Status
      </h2>

      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}

              {/* ✅ Always show values */}
              <LabelList
                dataKey="value"
                position="outside"
                className="text-xs fill-gray-700"
              />

              {/* ✅ Center label */}
              <Label
                value="196 Staff"
                position="center"
                className="text-sm fill-gray-700 font-semibold"
              />
            </Pie>

            {/* Tooltip still useful */}
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Custom Legend (clean SaaS style) */}
      <div className="flex justify-center gap-6 mt-3 text-xs">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
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