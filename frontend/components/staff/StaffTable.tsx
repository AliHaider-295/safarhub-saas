"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { authFetch } from "@/lib/api";

type Staff = {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: string;
  createdAt: string;
};
export default function StaffTable({
  refreshKey,
  onDeleteSuccess,
}: {
  refreshKey: number;
  onDeleteSuccess?: () => void;
}) {
  const [staff, setStaff] = useState<Staff[]>([]);

  const fetchStaff = async () => {
    try {
      const res = await authFetch("/staff");
      const data = await res.json();

      setStaff(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch staff error:", error);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = confirm("Delete staff?");
      if (!confirmDelete) return;
  
      const res = await authFetch(`/staff/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Delete failed");
  
      // 🔥 FORCE LOCAL SYNC FIRST (important)
      setStaff((prev) => prev.filter((item) => item.id !== id));
  
      // 🔥 THEN TRIGGER GLOBAL REFRESH
      onDeleteSuccess?.();
  
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, [refreshKey]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-lg text-gray-800">
          All Staff
        </h2>

        <span className="text-sm text-gray-500">
          Total: {staff.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm border-collapse">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-3 px-2 font-medium">
                Name
              </th>

              <th className="text-center py-3 px-2 font-medium">
                Role
              </th>

              <th className="text-center py-3 px-2 font-medium">
                Phone
              </th>

              <th className="text-center py-3 px-2 font-medium">
                Status
              </th>

              <th className="text-center py-3 px-2 font-medium">
                Date
              </th>

              <th className="text-center py-3 px-2 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {staff.length > 0 ? (
              staff.map((s) => (
                <tr
                  key={s.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-2 font-medium text-gray-800">
                    {s.name}
                  </td>

                  <td className="text-center py-4 px-2">
                    {s.role}
                  </td>

                  <td className="text-center py-4 px-2">
                    {s.phone}
                  </td>

                  <td className="text-center py-4 px-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        s.status?.toLowerCase() === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="text-center py-4 px-2 text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-2">
                    <div className="flex items-center justify-center gap-3">
                      <button>
                        <Eye
                          size={17}
                          className="text-blue-500 hover:scale-110 transition cursor-pointer"
                        />
                      </button>

                      <button>
                        <Pencil
                          size={17}
                          className="text-yellow-500 hover:scale-110 transition cursor-pointer"
                        />
                      </button>

                      <button onClick={() => handleDelete(s.id)}>
                        <Trash
                          size={17}
                          className="text-red-500 hover:scale-110 transition cursor-pointer"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  No staff available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}