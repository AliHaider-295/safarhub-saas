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

const data = [
  { day: "May 01", confirmed: 100, pending: 28, cancelled: 5 },
  { day: "May 03", confirmed: 120, pending: 32, cancelled: 6 },
  { day: "May 05", confirmed: 145, pending: 40, cancelled: 7 },
  { day: "May 07", confirmed: 135, pending: 38, cancelled: 6 },
  { day: "May 09", confirmed: 160, pending: 42, cancelled: 9 },
  { day: "May 11", confirmed: 150, pending: 48, cancelled: 12 },
  { day: "May 13", confirmed: 148, pending: 39, cancelled: 10 },
  { day: "May 15", confirmed: 150, pending: 34, cancelled: 8 },
  { day: "May 17", confirmed: 142, pending: 40, cancelled: 7 },
  { day: "May 19", confirmed: 133, pending: 35, cancelled: 7 },
  { day: "May 21", confirmed: 182, pending: 39, cancelled: 8 },
  { day: "May 23", confirmed: 165, pending: 40, cancelled: 8 },
  { day: "May 25", confirmed: 145, pending: 33, cancelled: 7 },
  { day: "May 27", confirmed: 150, pending: 34, cancelled: 7 },
  { day: "May 29", confirmed: 160, pending: 34, cancelled: 7 },
  { day: "May 31", confirmed: 142, pending: 33, cancelled: 7 },
];

export default function BookingOverviewChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 w-full h-[360px]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[20px] font-semibold text-gray-900">
          Bookings Overview
        </h3>

        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* LEGENDS */}
      <div className="flex items-center justify-center gap-8 mb-4 flex-wrap">
        
        <div className="flex items-center gap-2">
          <div className="w-5 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">
            Confirmed
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-2 rounded-full bg-yellow-400"></div>
          <span className="text-sm text-gray-600">
            Pending
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-2 rounded-full bg-red-400"></div>
          <span className="text-sm text-gray-600">
            Cancelled
          </span>
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[240px]">
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
                id="confirmed"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.18}
                />
                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="pending"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#facc15"
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor="#facc15"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="cancelled"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#ef4444"
                  stopOpacity={0.12}
                />
                <stop
                  offset="95%"
                  stopColor="#ef4444"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
                fill: "#6b7280",
              }}
            />

            <YAxis
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
              dataKey="confirmed"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#confirmed)"
            />

            <Area
              type="monotone"
              dataKey="pending"
              stroke="#facc15"
              strokeWidth={3}
              fill="url(#pending)"
            />

            <Area
              type="monotone"
              dataKey="cancelled"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#cancelled)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}