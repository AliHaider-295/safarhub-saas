"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { authFetch } from "@/lib/api"; // ✅ added

type Bus = {
  id: string;
  busNumber?: string;
  bus_number?: string;
  number?: string;
};

type Route = {
  id: string;
  from?: string;
  to?: string;
  start?: string;
  end?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddRecordModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    busId: "",
    routeId: "",
    date: "",
    income: "",
    expense: "",
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      busId: "",
      routeId: "",
      date: "",
      income: "",
      expense: "",
    });

    const fetchData = async () => {
      try {
        const [busRes, routeRes] = await Promise.all([
          authFetch("/buses"),     // ✅ FIXED
          authFetch("/routes"),    // ✅ FIXED
        ]);

        if (!busRes.ok || !routeRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const busJson = await busRes.json();
        const routeJson = await routeRes.json();

        const busList = Array.isArray(busJson)
          ? busJson
          : busJson?.data || busJson?.buses || [];

        const routeList = Array.isArray(routeJson)
          ? routeJson
          : routeJson?.data || routeJson?.routes || [];

        setBuses(busList);
        setRoutes(routeList);

      } catch (err) {
        console.error(err);
        toast.error("Failed to load buses/routes");
      }
    };

    fetchData();
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { busId, routeId, date, income, expense } = form;

    if (!busId?.trim() || !routeId?.trim()) {
      console.log("INVALID IDS:", form);
      toast.error("Select valid bus and route");
      return;
    }

    if (isNaN(new Date(date).getTime())) {
      toast.error("Invalid date");
      return;
    }

    console.log("SUBMIT DEBUG:", {
      busId,
      routeId,
    });

    setIsSubmitting(true);

    try {
      const res = await authFetch("/trips", { // ✅ FIXED
        method: "POST",
        body: JSON.stringify({
          busId,
          routeId,
          date,
          income: Number(income),
          expense: Number(expense),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create record");
      }

      toast.success("Record added successfully");

      onClose();
      onSuccess();

    } catch (err) {
      console.error(err);
      toast.error("Failed to add record");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-5">

        <h2 className="text-xl font-bold">Add Record</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            name="busId"
            value={form.busId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Bus</option>

            {buses.length === 0 ? (
              <option disabled>No buses found</option>
            ) : (
              buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.busNumber || bus.bus_number || bus.number || "Bus"}
                </option>
              ))
            )}
          </select>

          <select
            name="routeId"
            value={form.routeId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Route</option>

            {routes.length === 0 ? (
              <option disabled>No routes found</option>
            ) : (
              routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {(route.from || route.start || "From")} →{" "}
                  {(route.to || route.end || "To")}
                </option>
              ))
            )}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="income"
            placeholder="Income"
            value={form.income}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="expense"
            placeholder="Expense"
            value={form.expense}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 pt-2">

            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
}