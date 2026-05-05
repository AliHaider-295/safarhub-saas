"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { authFetch } from "@/lib/api"; // ✅ correct import

export default function AddStaffModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    role: "Driver",
    phone: "",
    status: "ACTIVE",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await authFetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ IMPORTANT
        },
        body: JSON.stringify(form),
      });

      onSuccess();
      onClose();

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to add staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Staff</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            onChange={handleChange}
          />

          <select name="role" className="w-full border px-3 py-2 rounded-lg text-sm" onChange={handleChange}>
            <option>Driver</option>
            <option>Conductor</option>
            <option>Support</option>
            <option>Helper</option>
            <option>Security</option>
          </select>

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            onChange={handleChange}
          />

          <select name="status" className="w-full border px-3 py-2 rounded-lg text-sm" onChange={handleChange}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
          >
            {loading ? "Adding..." : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}