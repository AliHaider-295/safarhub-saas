"use client";

import { useState } from "react";

export default function AddBusModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    number: "",
    type: "",
    capacity: "",
    status: "Active",
    driver: "",
  });

  if (!open) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("New Bus:", form);
    // later → API call
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4">Add New Bus</h2>

        {/* Form */}
        <div className="space-y-3">

          <input
            name="number"
            placeholder="Bus Number"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="type"
            placeholder="Bus Type (AC / Non-AC)"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="capacity"
            placeholder="Capacity"
            type="number"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="status"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>

          <input
            name="driver"
            placeholder="Driver Name"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Save Bus
          </button>
        </div>
      </div>
    </div>
  );
}