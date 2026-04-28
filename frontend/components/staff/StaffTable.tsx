"use client";

import { Eye, Pencil, Trash } from "lucide-react";

const staff = [
  {
    id: "DRV-001",
    name: "Ali Raza",
    role: "Driver",
    phone: "0300-1234567",
    status: "Active",
    date: "2024-01-15",
  },
  {
    id: "CON-002",
    name: "Imran Khan",
    role: "Conductor",
    phone: "0301-7654321",
    status: "Inactive",
    date: "2024-02-10",
  },
];

export default function StaffTable() {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-gray-800">All Staff</h2>

        <input
          placeholder="Search staff..."
          className="border px-3 py-1.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          {/* Head */}
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Staff</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Joined</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y">
            {staff.map((s, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition"
              >
                {/* Staff Info */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                      {s.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {s.id}
                      </p>
                    </div>

                  </div>
                </td>

                {/* Role */}
                <td className="px-4 py-3 text-gray-700">
                  {s.role}
                </td>

                {/* Phone */}
                <td className="px-4 py-3 text-gray-600">
                  {s.phone}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-500">
                  {formatDate(s.date)}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Eye
                      size={16}
                      className="text-gray-500 hover:text-blue-600 cursor-pointer transition"
                    />
                    <Pencil
                      size={16}
                      className="text-gray-500 hover:text-yellow-500 cursor-pointer transition"
                    />
                    <Trash
                      size={16}
                      className="text-gray-500 hover:text-red-500 cursor-pointer transition"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}