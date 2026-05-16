"use client";
import React from "react";
import { Filter, Download } from "lucide-react";

interface Filters {
  fromDate: string;
  toDate: string;
  status: string;
  routeId: string;
  busId: string;
}

interface Route {
  id: string;
  from: string;
  to: string;
}

interface Bus {
  id: string;
  busNumber: string;
}
interface Props {
  filters: Filters;

  setFilters: React.Dispatch<
    React.SetStateAction<Filters>
  >;

  onApplyFilters: (filters: Filters) => void;

  routes?: Route[];

  buses?: Bus[];
}

export default function BookingFilters({
  filters,
  setFilters,
  onApplyFilters,
  routes = [],
  buses = [],
}: Props) {

  const handleChange = (
    key: string,
    value: string
  ) => {
  
    console.log("CHANGE:", key, value);
  
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">

        {/* FROM DATE */}
        <div className="flex flex-col min-w-[180px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            FROM DATE
          </label>
          <input
            type="date"
            value={filters.fromDate || ""}
            onChange={(e) => handleChange("fromDate", e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* TO DATE */}
        <div className="flex flex-col min-w-[180px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            TO DATE
          </label>
          <input
            type="date"
            value={filters.toDate || ""}
            onChange={(e) => handleChange("toDate", e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* STATUS */}
        <div className="flex flex-col min-w-[160px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            STATUS
          </label>
          <select
  value={filters.status || ""}
  onChange={(e) =>
    handleChange(
      "status",
      e.target.value
    )
  }
  className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
>
  <option value="">All Status</option>
  <option value="CONFIRMED">
    Confirmed
  </option>
  <option value="PENDING">
    Pending
  </option>
  <option value="CANCELLED">
    Cancelled
  </option>
</select>
        </div>

        {/* ROUTE */}
        <div className="flex flex-col min-w-[160px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            ROUTE
          </label>
          <select
            value={filters.routeId || ""}
            onChange={(e) => handleChange("routeId", e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Routes</option>
            {Array.isArray(routes) &&
            routes.map((route: any) => (
              <option key={route.id} value={route.id}>
               {route.from} → {route.to}
              </option>
            ))}
          </select>
        </div>

        {/* BUS */}
        <div className="flex flex-col min-w-[160px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            BUS
          </label>
          <select
            value={filters.busId || ""}
            onChange={(e) => handleChange("busId", e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Buses</option>
            {Array.isArray(buses) &&
            buses.map((bus: any) => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 ml-auto">
        <button
  onClick={() => onApplyFilters(filters)}
  className="h-10 px-4 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition"
>
  <Filter size={16} />
  Filter
</button>

          <button className="h-10 px-4 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}