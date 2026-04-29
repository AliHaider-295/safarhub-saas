"use client";

import { useState } from "react";
import { X } from "lucide-react";

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

      const res = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add staff");
        return;
      }

      onSuccess(); // 🔥 refresh list
      onClose();   // close modal
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Staff</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">

          {/* Name */}
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          {/* Role */}
          <select
            name="role"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            onChange={handleChange}
          >
            <option>Driver</option>
            <option>Conductor</option>
            <option>Support</option>
            <option>Helper</option>
            <option>Security</option>
          </select>

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            onChange={handleChange}
          />

          {/* Status */}
          <select
            name="status"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            onChange={handleChange}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}