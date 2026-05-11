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

/* ── shared style tokens ── */
const labelCls =
  "block text-[11px] font-semibold text-gray-500 tracking-wider uppercase mb-1.5";

const inputCls =
  "w-full h-9 px-3 text-[13px] text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder-gray-400";

const selectWrap = "relative w-full";

const selectCls =
  "w-full h-9 pl-3 pr-8 text-[13px] text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all appearance-none cursor-pointer";

const ChevronDown = () => (
  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
);

const CalendarIcon = () => (
  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  </span>
);

export default function TransactionFilters({
  filters,
  setFilters,
  onExport,
  onFilter,
  buses = [],
  routes = [],
}: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4">
      <div className="flex flex-wrap items-end gap-3">

        {/* FROM DATE */}
        <div className="min-w-[150px] flex-1">
          <label className={labelCls}>From Date</label>
          <div className="relative">
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
              className={inputCls + " pr-8"}
            />
           
          </div>
        </div>

        {/* TO DATE */}
        <div className="min-w-[150px] flex-1">
          <label className={labelCls}>To Date</label>
          <div className="relative">
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
              className={inputCls + " pr-8"}
            />
          
          </div>
        </div>

        {/* TYPE */}
        <div className="min-w-[110px] flex-1">
          <label className={labelCls}>Type</label>
          <div className={selectWrap}>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className={selectCls}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="min-w-[140px] flex-1">
          <label className={labelCls}>Category</label>
          <div className={selectWrap}>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className={selectCls}
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
            <ChevronDown />
          </div>
        </div>

        {/* BUS */}
        <div className="min-w-[120px] flex-1">
          <label className={labelCls}>Bus</label>
          <div className={selectWrap}>
            <select
              value={filters.busId}
              onChange={(e) => setFilters({ ...filters, busId: e.target.value })}
              className={selectCls}
            >
              <option value="">All Buses</option>
              {(buses ?? []).length === 0 ? (
                <option disabled>No buses found</option>
              ) : (
                buses.map((bus: any) => (
                  <option key={bus._id || bus.id} value={bus._id || bus.id}>
                    {bus.busNumber || bus.name || bus.bus_name || "Unnamed Bus"}
                  </option>
                ))
              )}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* ROUTE */}
        <div className="min-w-[120px] flex-1">
          <label className={labelCls}>Route</label>
          <div className={selectWrap}>
            <select
              value={filters.routeId}
              onChange={(e) => setFilters({ ...filters, routeId: e.target.value })}
              className={selectCls}
            >
              <option value="">All Routes</option>
              {(routes ?? []).map((route: any) => (
                <option key={route._id || route.id} value={route._id || route.id}>
                  {route.route ||
                    route.title ||
                    `${route.from ?? ""} → ${route.to ?? ""}` ||
                    route.name ||
                    "Route"}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-end gap-2 shrink-0">
          {/* Filter */}
          <button
            onClick={onFilter}
            className="inline-flex items-center gap-1.5 h-9 px-4 text-[12.5px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 h-9 px-4 text-[12.5px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>

      </div>
    </div>
  );
}
