import { Filter, Download } from "lucide-react";

export default function BookingFilters() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

      {/* Filters Row */}
      <div className="flex flex-wrap items-end gap-4">

        {/* FROM DATE */}
        <div className="flex flex-col min-w-[180px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            FROM DATE
          </label>
          <input
            type="date"
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
            className="h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* STATUS */}
        <div className="flex flex-col min-w-[160px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            STATUS
          </label>
          <select className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Status</option>
          </select>
        </div>

        {/* ROUTE */}
        <div className="flex flex-col min-w-[160px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            ROUTE
          </label>
          <select className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Routes</option>
          </select>
        </div>

        {/* BUS */}
        <div className="flex flex-col min-w-[160px] flex-1">
          <label className="text-xs font-medium text-gray-500 mb-1">
            BUS
          </label>
          <select className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Buses</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 ml-auto">
          <button className="h-10 px-4 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition">
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