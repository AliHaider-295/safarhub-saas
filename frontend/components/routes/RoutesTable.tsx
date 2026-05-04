"use client";

import { useEffect, useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";

export default function RoutesTable({ refresh, onChange }: any) {
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch routes
  const fetchRoutes = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/routes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ✅ Safety (avoid filter error)
      setRoutes(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Fetch routes error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [refresh]);

  // ✅ Search filter
  const filtered = routes.filter((r) =>
    `${r.from} ${r.to}`.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle: any = {
    ACTIVE: "bg-green-100 text-green-600",
    INACTIVE: "bg-red-100 text-red-600",
  };

  // ✅ Delete route
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this route?")) return;
  
    try {
      const token = localStorage.getItem("safarhub_token");
  
      const res = await fetch(`http://localhost:5000/api/routes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Delete failed");
        return;
      }
  
      // ✅ update table instantly
      setRoutes(prev => prev.filter(r => r.id !== id));
  
      // 🔥 THIS IS THE IMPORTANT PART
      onChange?.();
  
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">

    {/* 🔹 Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 className="font-semibold text-lg">All Routes</h2>
  
      <input
        placeholder="Search route..."
        className="border px-3 py-2 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  
    {/* 🔹 Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
  
        {/* ✅ Hide header on mobile */}
        <thead className="hidden sm:table-header-group text-gray-500 border-b text-xs uppercase tracking-wide">
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
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                Loading routes...
              </td>
            </tr>
          ) : filtered.length > 0 ? (
            filtered.map((r: any) => (
              <tr
                key={r.id}
                className="border-b hover:bg-gray-50 transition flex flex-col sm:table-row p-3 sm:p-0"
              >
  
                {/* Route */}
                <td className="py-2 sm:py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {r.from} → {r.to}
                    </span>
                    <span className="text-xs text-gray-400">
                      Route ID: {r.id.slice(0, 6)}
                    </span>
                  </div>
                </td>
  
                {/* Distance */}
                <td className="text-gray-600 py-1 sm:py-0">
                  <span className="sm:hidden text-xs text-gray-400">Distance: </span>
                  {r.distance} km
                </td>
  
                {/* Trips */}
                <td className="py-1 sm:py-0">
                  <span className="sm:hidden text-xs text-gray-400">Trips: </span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    {r.trips || 0} trips
                  </span>
                </td>
  
                {/* Status */}
                <td className="py-1 sm:py-0">
                  <span className="sm:hidden text-xs text-gray-400">Status: </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      statusStyle[r.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
  
                {/* Date */}
                <td className="text-gray-500 text-sm py-1 sm:py-0">
                  <span className="sm:hidden text-xs text-gray-400">Created: </span>
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
  
                {/* Actions */}
                <td className="py-2 sm:py-0">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-2 hover:bg-red-100 rounded text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
  
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
  
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-400">
                No routes found
              </td>
            </tr>
          )}
        </tbody>
  
      </table>
    </div>
  </div>
  );
}