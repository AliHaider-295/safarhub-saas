"use client";

import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

type Props = {
  income: number;
  expense: number;
};

export default function RecordsCards({ income, expense }: Props) {
  const profit = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* Income Card */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-green-100 shadow-sm">
        <div>
          <p className="text-sm text-green-700 font-medium">Total Income</p>
          <h2 className="text-2xl font-bold text-green-900 mt-1">
            Rs {income.toLocaleString()}
          </h2>
        </div>
        <div className="p-3 bg-green-200 rounded-full">
          <ArrowUpRight className="text-green-800" />
        </div>
      </div>

      {/* Expense Card */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-red-100 shadow-sm">
        <div>
          <p className="text-sm text-red-700 font-medium">Total Expense</p>
          <h2 className="text-2xl font-bold text-red-900 mt-1">
            Rs {expense.toLocaleString()}
          </h2>
        </div>
        <div className="p-3 bg-red-200 rounded-full">
          <ArrowDownRight className="text-red-800" />
        </div>
      </div>

      {/* Profit Card */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-blue-100 shadow-sm">
        <div>
          <p className="text-sm text-blue-700 font-medium">Total Profit</p>
          <h2 className="text-2xl font-bold text-blue-900 mt-1">
            Rs {profit.toLocaleString()}
          </h2>
        </div>
        <div className="p-3 bg-blue-200 rounded-full">
          <Wallet className="text-blue-800" />
        </div>
      </div>

    </div>
  );
}