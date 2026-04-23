"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", income: 1200, expense: 400 },
  { day: "Tue", income: 1500, expense: 900 },
  { day: "Wed", income: 1000, expense: 300 },
  { day: "Thu", income: 1800, expense: 1300 },
  { day: "Fri", income: 2000, expense: 700 },
  { day: "Sat", income: 1700, expense: 500 },
  { day: "Sun", income: 900, expense: 200 },
];

// 🎯 function to decide expense color
const getExpenseColor = (value: number) => {
  if (value < 400) return "#facc15";   // yellow (low)
  if (value < 800) return "#fb923c";   // orange (medium)
  return "#ef4444";                    // red (high)
};

export default function RevenueChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-4 font-semibold">Weekly Income vs Expense</h2>

      <ResponsiveContainer width="100%" height={466}>
        <BarChart data={data} barCategoryGap={20}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* ✅ Income (always green) */}
          <Bar dataKey="income" barSize={12}>
            {data.map((entry, index) => (
              <Cell key={`income-${index}`} fill="#22c55e" />
            ))}
          </Bar>

          {/* 🔥 Expense (dynamic color) */}
          <Bar dataKey="expense" barSize={12}>
            {data.map((entry, index) => (
              <Cell
                key={`expense-${index}`}
                fill={getExpenseColor(entry.expense)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}