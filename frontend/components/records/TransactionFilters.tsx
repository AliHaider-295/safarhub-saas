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

  setFilters: React.Dispatch<React.SetStateAction<any>>;

  onExport: () => void;
  onFilter: () => void;

  buses?: any[];
  routes?: any[];
};

export default function TransactionFilters({
  filters,
  setFilters,
  onExport,
  onFilter,
  buses = [],
  routes = [],
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
              setFilters({ ...filters, fromDate: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
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
              setFilters({ ...filters, toDate: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
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
              setFilters({ ...filters, type: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
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
              setFilters({ ...filters, category: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            <option value="ticket">Ticket</option>
            <option value="other_income">Other Income</option>
            <option value="fuel">Fuel</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
            <option value="salary">Salary</option>
            <option value="other_expense">Other Expense</option>
          </select>
        </div>

        {/* BUS */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Bus
          </label>
          <select
  value={filters.busId}
  onChange={(e) =>
    setFilters({ ...filters, busId: e.target.value })
  }
  className="w-full border rounded-lg px-3 py-2 text-sm"
>
  <option value="">All Buses</option>

  {(buses ?? []).length === 0 ? (
    <option disabled>No buses found</option>
  ) : (
    buses.map((bus: any) => (
      <option
        key={bus._id || bus.id}
        value={bus._id || bus.id}
      >
        {bus.busNumber || bus.name || bus.bus_name || "Unnamed Bus"}
      </option>
    ))
  )}
</select>
        </div>

        {/* ROUTE */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Route
          </label>
          <select
  value={filters.routeId}
  onChange={(e) =>
    setFilters({ ...filters, routeId: e.target.value })
  }
  className="w-full border rounded-lg px-3 py-2 text-sm"
>
  <option value="">All Routes</option>

  {(routes ?? []).map((route: any) => (
    <option
      key={route._id || route.id}
      value={route._id || route.id}
    >
      {route.route ||
        route.title ||
        `${route.from ?? ""} → ${route.to ?? ""}` ||
        route.name ||
        "Route"}
    </option>
  ))}
</select>
        </div>

        {/* EXPORT */}
        <div className="flex items-end">
          <Button onClick={onExport} className="w-full">
            Export
          </Button>
        </div>

        {/* FILTER */}
        <div className="flex items-end">
          <Button onClick={onFilter} className="w-full">
            Apply Filter
          </Button>
        </div>

      </div>
    </div>
  );
}