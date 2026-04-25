"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

type Bus = {
  id: number;
  number: string;
  type: string;
  capacity: number;
  status: "active" | "maintenance" | "inactive";
  driver: string;
  lastTrip: string;
};

const mockData: Bus[] = [
  {
    id: 1,
    number: "BUS-101",
    type: "AC",
    capacity: 50,
    status: "active",
    driver: "Ali Khan",
    lastTrip: "Karachi → Lahore",
  },
  {
    id: 2,
    number: "BUS-102",
    type: "Non-AC",
    capacity: 40,
    status: "maintenance",
    driver: "Ahmed Raza",
    lastTrip: "Islamabad → Multan",
  },
  {
    id: 3,
    number: "BUS-103",
    type: "AC",
    capacity: 45,
    status: "inactive",
    driver: "Usman Ali",
    lastTrip: "Lahore → Faisalabad",
  },
  // 👉 duplicate for testing pagination
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 4,
    number: `BUS-${200 + i}`,
    type: "AC",
    capacity: 50,
    status: i % 2 === 0 ? "active" : "inactive",
    driver: "Driver " + i,
    lastTrip: "Route " + i,
  })),
];

export default function BusesTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  // 🔍 Filter
  const filtered = mockData.filter((bus) =>
    bus.number.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginatedData = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // 🎨 Status color
  const statusStyles = {
    active: "bg-green-100 text-green-700",
    maintenance: "bg-yellow-100 text-yellow-700",
    inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">

      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-semibold">All Buses</h2>

        <input
          type="text"
          placeholder="Search bus..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64"
        />
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">

          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Bus</th>
              <th className="text-left">Type</th>
              <th className="text-left">Capacity</th>
              <th className="text-left">Status</th>
              <th className="text-left">Driver</th>
              <th className="text-left">Last Trip</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((bus) => (
              <tr key={bus.id} className="border-b hover:bg-gray-50">

                <td className="py-2 font-medium">{bus.number}</td>
                <td>{bus.type}</td>
                <td>{bus.capacity}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      statusStyles[bus.status]
                    }`}
                  >
                    {bus.status}
                  </span>
                </td>

                <td>{bus.driver}</td>
                <td>{bus.lastTrip}</td>

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

      {/* 🔹 Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">

        <p className="text-gray-500">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>

    </div>
  );
}