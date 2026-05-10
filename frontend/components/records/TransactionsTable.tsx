"use client";

import { useState } from "react";

type Transaction = {
  id: string;
  type: string;
  category: string;
  amount: number;
  passengers?: number;
  paymentMethod?: string;
  description?: string;
  date: string;
  bus?: {
    busNumber?: string;
    bus_number?: string;
    number?: string;
  };
  route?: {
    from?: string;
    to?: string;
    start?: string;
    end?: string;
  };
  createdBy?: string;
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionsTable({ transactions }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);
  const totalRecords = transactions.length;

  // Filter state (UI only — wire to real logic as needed)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [busFilter, setBusFilter] = useState("All Buses");
  const [routeFilter, setRouteFilter] = useState("All Routes");

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const getBusLabel = (t: Transaction) =>
    t.bus?.busNumber || t.bus?.bus_number || t.bus?.number || "-";

  const getRouteLabel = (t: Transaction) =>
    t.route
      ? `${t.route.from || t.route.start || "?"} → ${t.route.to || t.route.end || "?"}`
      : "-";

  /* ─── shared input/select base classes ─── */
  const inputBase =
    "w-full h-9 px-3 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition placeholder-gray-400";

  const selectBase =
    "w-full h-9 pl-3 pr-8 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition appearance-none cursor-pointer";

  return (
    <div className="space-y-3">

      {/* ══════════════════════════════════════════
          FILTER TOOLBAR
      ══════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex flex-wrap items-end gap-3">

          {/* From Date */}
          <div className="flex flex-col gap-1 min-w-[130px]">
            <label className="text-[10.5px] font-semibold text-gray-500 tracking-wide uppercase">
              From Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className={inputBase + " pr-8"}
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
            </div>
          </div>

          {/* To Date */}
          <div className="flex flex-col gap-1 min-w-[130px]">
            <label className="text-[10.5px] font-semibold text-gray-500 tracking-wide uppercase">
              To Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className={inputBase + " pr-8"}
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10.5px] font-semibold text-gray-500 tracking-wide uppercase">
              Type
            </label>
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={selectBase}
              >
                <option>All Types</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1 min-w-[140px]">
            <label className="text-[10.5px] font-semibold text-gray-500 tracking-wide uppercase">
              Category
            </label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={selectBase}
              >
                <option>All Categories</option>
                <option>Ticket Sales</option>
                <option>Fuel</option>
                <option>Maintenance</option>
                <option>Parcel Service</option>
                <option>Staff Salary</option>
                <option>Toll Tax</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bus */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10.5px] font-semibold text-gray-500 tracking-wide uppercase">
              Bus
            </label>
            <div className="relative">
              <select
                value={busFilter}
                onChange={(e) => setBusFilter(e.target.value)}
                className={selectBase}
              >
                <option>All Buses</option>
                <option>Bus #B-110</option>
                <option>Bus #B-115</option>
                <option>Bus #B-123</option>
                <option>Bus #B-128</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>

          {/* Route */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10.5px] font-semibold text-gray-500 tracking-wide uppercase">
              Route
            </label>
            <div className="relative">
              <select
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className={selectBase}
              >
                <option>All Routes</option>
                <option>Route 02</option>
                <option>Route 03</option>
                <option>Route 05</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex items-end gap-2 pb-0">

            {/* Filter button */}
            <button className="inline-flex items-center gap-1.5 h-9 px-4 text-[12px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors whitespace-nowrap">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filter
            </button>

            {/* Export button */}
            <button className="inline-flex items-center gap-1.5 h-9 px-4 text-[12px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TABLE CARD
      ══════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">

        {/* Section title */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
          <h2 className="text-[14px] font-semibold text-gray-800 tracking-tight">
            Transaction Records
          </h2>
        </div>

        {/* TABLE */}
        <table className="table-fixed w-full text-sm">
          <colgroup>
            <col style={{ width: "13%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>

          {/* HEAD */}
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="px-4 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Date</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Type</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Category</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Description</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Bus</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Route</th>
              <th className="px-3 py-3 text-right text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Amount (Rs)</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Payment Method</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Created By</th>
              <th className="px-3 py-3 text-left text-[10.5px] font-semibold text-gray-400 tracking-wider uppercase">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-50">
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center text-sm text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((t) => {
                const isIncome = t.type === "income";
                return (
                  <tr key={t.id} className="hover:bg-gray-50/60 transition-colors duration-100">

                    {/* DATE */}
                    <td className="px-4 py-3 text-[11.5px] text-gray-600 truncate">
                      {new Date(t.date).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    {/* TYPE */}
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1 text-[11.5px] font-semibold ${isIncome ? "text-emerald-600" : "text-red-500"}`}>
                        {isIncome ? (
                          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                          </svg>
                        )}
                        {isIncome ? "Income" : "Expense"}
                      </span>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-3 py-3 text-[11.5px] text-gray-700 capitalize truncate">
                      {t.category.replace(/_/g, " ")}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-3 py-3 text-[11.5px] text-gray-500 truncate">
                      {t.description || "-"}
                    </td>

                    {/* BUS */}
                    <td className="px-3 py-3 text-[11.5px] text-gray-600 truncate">
                      {getBusLabel(t)}
                    </td>

                    {/* ROUTE */}
                    <td className="px-3 py-3 text-[11.5px] text-gray-600 truncate">
                      {getRouteLabel(t)}
                    </td>

                    {/* AMOUNT */}
                    <td className={`px-3 py-3 text-[11.5px] font-semibold text-right tabular-nums ${isIncome ? "text-emerald-600" : "text-red-500"}`}>
                      {t.amount.toLocaleString()}
                    </td>

                    {/* PAYMENT */}
                    <td className="px-3 py-3 text-[11.5px] text-gray-600 capitalize truncate">
                      {t.paymentMethod || "-"}
                    </td>

                    {/* CREATED BY */}
                    <td className="px-3 py-3 text-[11.5px] text-gray-600 truncate">
                      {t.createdBy || "-"}
                    </td>

                    {/* ACTION */}
                    <td className="px-3 py-3">
                      <button
                        className="inline-flex items-center justify-center w-6 h-6 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        title="More options"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="12" cy="19" r="1.5" />
                        </svg>
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">

          <p className="text-[11.5px] text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-600">
              {totalRecords === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-600">
              {Math.min(startIndex + itemsPerPage, totalRecords)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-600">{totalRecords}</span>{" "}
            records
          </p>

          <div className="flex items-center gap-1">

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {getPageNumbers().map((page, idx) =>
              page === "ellipsis" ? (
                <span key={`ellipsis-${idx}`} className="w-7 h-7 flex items-center justify-center text-gray-400 text-[12px] select-none">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-[12px] font-medium border transition-colors ${
                    currentPage === page
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
