"use client";

import { Button } from "@/components/ui/Button";

type Props = {
  filters: {
    fromDate: string;
    toDate: string;
    type: string;
    category: string;
    busId: string;
    routeId: string;
  };

  setFilters: React.Dispatch<
    React.SetStateAction<{
      fromDate: string;
      toDate: string;
      type: string;
      category: string;
      busId: string;
      routeId: string;
    }>
  >;

  onExport: () => void;
};

export default function TransactionFilters({
  filters,
  setFilters,
  onExport,
}: Props) {

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">

        {/* FROM DATE */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            From Date
          </label>

          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                fromDate: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TO DATE */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            To Date
          </label>

          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                toDate: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TYPE */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Type
          </label>

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({
                ...filters,
                type: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>

            {/* INCOME */}
            <option value="ticket">Ticket</option>
            <option value="other_income">
              Other Income
            </option>

            {/* EXPENSE */}
            <option value="fuel">Fuel</option>
            <option value="maintenance">
              Maintenance
            </option>
            <option value="repair">Repair</option>
            <option value="salary">Salary</option>
            <option value="other_expense">
              Other Expense
            </option>
          </select>
        </div>

        {/* BUS */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Bus
          </label>

          <input
            type="text"
            placeholder="All Buses"
            value={filters.busId}
            onChange={(e) =>
              setFilters({
                ...filters,
                busId: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ROUTE */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Route
          </label>

          <input
            type="text"
            placeholder="All Routes"
            value={filters.routeId}
            onChange={(e) =>
              setFilters({
                ...filters,
                routeId: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* EXPORT BUTTON */}
        <div className="flex items-end">
          <Button
            onClick={onExport}
            className="w-full"
          >
            Export
          </Button>
        </div>

      </div>
    </div>
  );
}