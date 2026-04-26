"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function BusesTable({
  buses,
  fetchBuses,
}: {
  buses: any[];
  fetchBuses: () => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  // 🔍 Filter (updated field name)
  const filtered = buses.filter((bus) => {
    const name = bus.busNumber ?? "";
    console.log("Buses data:", buses);
    return name.toLowerCase().includes(search.toLowerCase());
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginatedData = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // 🎨 Status styles (UPDATED for enum)
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700",
    MAINTENANCE: "bg-yellow-100 text-yellow-700",
    INACTIVE: "bg-red-100 text-red-700",
  };

  // ❌ Delete bus
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/buses/${id}`, {
      method: "DELETE",
    });

    fetchBuses(); // refresh
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">

      {/* Header */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">

          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Bus</th>
              <th className="text-left">Type</th>
              <th className="text-left">Capacity</th>
              <th className="text-left">Status</th>
              <th className="text-left">Driver</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((bus) => (
              <tr key={bus.id} className="border-b hover:bg-gray-50">

                <td className="py-2 font-medium">{bus.busNumber}</td>
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

                <td>{bus.driverName}</td>

                <td className="text-right flex justify-end gap-2">

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(bus.id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>

                  {/* Menu (future edit) */}
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">

        <p className="text-gray-500">
          Page {page} of {totalPages || 1}
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
            disabled={page === totalPages || totalPages === 0}
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