"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { authFetch } from "@/lib/api"; // ✅ ADDED

type Staff = {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: string;
  createdAt: string;
};

export default function StaffTable() {
  const [staff, setStaff] = useState<Staff[]>([]);

  // ✅ Fetch from backend (UPDATED)
  const fetchStaff = async () => {
    try {
      const res = await authFetch("/staff"); // 🔥 CLEAN API CALL

      const data = await res.json();
      setStaff(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch staff error:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-4 font-semibold">All Staff</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="py-2 font-medium">{s.name}</td>
                <td>{s.role}</td>
                <td>{s.phone}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      s.status === "ACTIVE"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="text-gray-500">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>

                <td className="flex gap-2">
                  <Eye size={16} className="text-blue-500 cursor-pointer" />
                  <Pencil size={16} className="text-yellow-500 cursor-pointer" />
                  <Trash size={16} className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}