"use client";

import { useState } from "react";

export default function AddBusModal({
  open,
  onClose,
  fetchBuses, // ✅ add this prop
}: {
  open: boolean;
  onClose: () => void;
  fetchBuses: () => void;
}) {
  const [form, setForm] = useState({
    busNumber: "",
    type: "",
    capacity: "",
    status: "ACTIVE",
    driverName: "",
  });

  if (!open) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/api/buses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity), // ✅ fix type
          userId: "YOUR_USER_ID", // 🔥 replace later with auth
        }),
      });

      fetchBuses(); // ✅ refresh table
      onClose();    // ✅ close modal
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        
        <h2 className="text-lg font-semibold mb-4">Add New Bus</h2>

        <div className="space-y-3">

          <input
            name="busNumber"
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
            value={form.status}
          >
            <option value="ACTIVE">Active</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <input
            name="driverName"
            placeholder="Driver Name"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

        </div>

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