"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [];

export default function RevenueOverviewChart({
  data = [],
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 w-full h-[360px]">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[20px] font-semibold text-gray-900">
          Revenue Overview
        </h3>

        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* CHART */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
                fill: "#6b7280",
              }}
            />

            <YAxis
              tickFormatter={(value) =>
                `${value / 1000}K`
              }
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
                fill: "#6b7280",
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}