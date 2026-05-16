import { Filter, Download } from "lucide-react";

export default function BookingFilters({
  filters,
  setFilters,
  onApplyFilters,
  routes = [],
  buses = [],
}) {
  const handleChange = (key, value) => {
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
            onChange={(e) => handleChange("status", e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
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
            {routes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.name}
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
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.busNumber}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 ml-auto">
          <button
            onClick={onApplyFilters}
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