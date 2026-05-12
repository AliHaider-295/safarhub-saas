"use client";

import { useState } from "react";
import { authFetch } from "@/lib/api"; // ✅ added

export default function AddRouteModal({ open, onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    distance: "",
    status: "ACTIVE",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // ❌ removed localStorage + manual fetch
      const res = await authFetch("/routes", {
        method: "POST",
        body: JSON.stringify({
          from: form.from,
          to: form.to,
          distance: Number(form.distance),
          status: form.status,
        }),
      });

      const data = await res.json();

      console.log("Route API Response:", data);

      if (!res.ok) {
        alert(data.error || "Failed to create route");
        return;
      }

      setForm({
        from: "",
        to: "",
        distance: "",
        status: "ACTIVE",
      });

      onSuccess?.();
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

        <input
          placeholder="From (e.g. Karachi)"
          value={form.from}
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, from: e.target.value })
          }
        />

        <input
          placeholder="To (e.g. Lahore)"
          value={form.to}
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, to: e.target.value })
          }
        />

        <input
          placeholder="Distance (km)"
          type="number"
          value={form.distance}
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, distance: e.target.value })
          }
        />

        <select
          value={form.status}
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <div className="flex justify-end gap-2 mt-4">

          <button onClick={onClose} className="text-gray-500 text-sm">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}