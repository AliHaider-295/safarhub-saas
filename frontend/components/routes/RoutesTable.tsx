"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

const data = [
  {
    id: 1,
    from: "Karachi",
    to: "Lahore",
    distance: 1200,
    trips: 20,
    status: "active",
    date: "2026-04-01",
  },
  {
    id: 2,
    from: "Lahore",
    to: "Islamabad",
    distance: 380,
    trips: 15,
    status: "inactive",
    date: "2026-04-02",
  },
];

export default function RoutesTable() {
  const [search, setSearch] = useState("");

  const filtered = data.filter((r) =>
    `${r.from} ${r.to}`.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = {
    active: "bg-green-100 text-green-600",
    inactive: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">

      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-semibold text-lg">All Routes</h2>

        <input
          placeholder="Search route..."
          className="border px-3 py-2 rounded-lg text-sm w-full sm:w-64"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">

          <thead className="text-gray-500 border-b text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left py-3">Route</th>
              <th className="text-left">Distance</th>
              <th className="text-left">Trips</th>
              <th className="text-left">Status</th>
              <th className="text-left">Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* 🔥 Route (Improved UI) */}
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {r.from} → {r.to}
                    </span>
                    <span className="text-xs text-gray-400">
                      Direct route
                    </span>
                  </div>
                </td>

                {/* Distance */}
                <td className="text-gray-600">
                  {r.distance} km
                </td>

                {/* 🔥 Trips Badge */}
                <td>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    {r.trips} trips
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      statusStyle[r.status]
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                {/* Date */}
                <td className="text-gray-500 text-sm">
                  {new Date(r.date).toLocaleDateString()}
                </td>

                {/* 🔥 Actions */}
                <td className="text-right">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* 🔹 Empty State */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No routes found
        </p>
      )}
    </div>
  );
}