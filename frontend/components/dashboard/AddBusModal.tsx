"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { authFetch } from "@/lib/api"; // ✅ added

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type FormState = {
  busNumber: string;
  type: "AC" | "Non-AC";
  capacity: string;
  status: "ACTIVE" | "MAINTENANCE";
};

export default function AddBusModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({
    busNumber: "",
    type: "AC",
    capacity: "",
    status: "ACTIVE",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.busNumber.trim()) {
      toast.error("Bus number required");
      return;
    }

    try {
      setLoading(true);

      // ✅ ONLY CHANGE: fetch → authFetch
      const res = await authFetch("/buses", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Request failed");

      toast.success("Bus added successfully");

      onSuccess();
      onClose();

      setForm({
        busNumber: "",
        type: "AC",
        capacity: "",
        status: "ACTIVE",
      });

    } catch (error) {
      toast.error("Failed to add bus");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">Add Bus</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="busNumber"
            placeholder="Bus Number (e.g BUS-101)"
            value={form.busNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}