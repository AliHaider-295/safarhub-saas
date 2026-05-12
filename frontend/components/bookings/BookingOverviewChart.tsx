"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "May 01", confirmed: 100, pending: 30, cancelled: 5 },
  { day: "May 06", confirmed: 140, pending: 40, cancelled: 8 },
  { day: "May 11", confirmed: 170, pending: 45, cancelled: 12 },
  { day: "May 16", confirmed: 150, pending: 35, cancelled: 9 },
  { day: "May 21", confirmed: 180, pending: 38, cancelled: 10 },
  { day: "May 26", confirmed: 155, pending: 34, cancelled: 7 },
];

export default function BookingOverviewChart() {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-semibold mb-4">Bookings Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="confirmed" stroke="#22c55e" />
          <Line type="monotone" dataKey="pending" stroke="#facc15" />
          <Line type="monotone" dataKey="cancelled" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}