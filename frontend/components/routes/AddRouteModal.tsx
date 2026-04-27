"use client";

import { useState } from "react";

export default function AddRouteModal({ open, onClose }: any) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    distance: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="mb-4 font-semibold">Add Route</h2>

        <input
          placeholder="From"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, from: e.target.value })}
        />

        <input
          placeholder="To"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />

        <input
          placeholder="Distance"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, distance: e.target.value })}
        />

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}