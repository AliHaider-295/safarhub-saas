"use client";

import { useState } from "react";

export default function AddBusModal({
  open,
  onClose,
  fetchBuses,
}: {
  open: boolean;
  onClose: () => void;
  fetchBuses: () => void;
}) {
  const [form, setForm] = useState({
    busNumber: "",
    type: "AC", // ✅ default fixed
    capacity: "",
    status: "ACTIVE",
    driverName: "",
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // ✅ basic validation
    if (!form.busNumber.trim()) {
      alert("Bus number is required");
      return;
    }

    if (!form.capacity) {
      alert("Capacity is required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("safarhub_token");

      console.log("Submitting form:", form); // 🔍 debug

      const res = await fetch("http://localhost:5000/api/buses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ required
        },
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity),
        }),
      });

      const data = await res.json();

      console.log("API Response:", data); // 🔍 debug

      if (!res.ok) {
        console.error("API Error:", data);
        throw new Error(data?.error || "Failed to add bus");
      }

      alert("✅ Bus added successfully");

      // ✅ reset form
      setForm({
        busNumber: "",
        type: "AC",
        capacity: "",
        status: "ACTIVE",
        driverName: "",
      });

      // ✅ refresh buses list
      await fetchBuses();

      onClose();

    } catch (error: any) {
      console.error("Submit Error:", error.message);
      alert(error.message || "Error adding bus");
    } finally {
      setLoading(false);
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
            value={form.busNumber} // ✅ controlled input
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          >
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>

          <input
            name="capacity"
            placeholder="Capacity"
            type="number"
            value={form.capacity}
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
            value={form.driverName}
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
          />

        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Bus"}
          </button>
        </div>
      </div>
    </div>
  );
}