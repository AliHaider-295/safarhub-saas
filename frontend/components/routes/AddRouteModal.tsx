"use client";

import { useState } from "react";

export default function AddRouteModal({ open, onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    distance: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("safarhub_token");

      const res = await fetch("http://localhost:5000/api/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ auth
        },
        body: JSON.stringify({
          from: form.from,
          to: form.to,
          distance: Number(form.distance),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create route");
        return;
      }

      // ✅ reset form
      setForm({ from: "", to: "", distance: "" });

      // ✅ refresh parent UI
      onSuccess && onSuccess();

      // ✅ close modal
      onClose();

    } catch (error) {
      console.error("Create Route Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="mb-4 font-semibold text-lg">Add Route</h2>

        {/* From */}
        <input
          placeholder="From (e.g. Karachi)"
          value={form.from}
          className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, from: e.target.value })}
        />

        {/* To */}
        <input
          placeholder="To (e.g. Lahore)"
          value={form.to}
          className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />

        {/* Distance */}
        <input
          placeholder="Distance (km)"
          type="number"
          value={form.distance}
          className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, distance: e.target.value })}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}