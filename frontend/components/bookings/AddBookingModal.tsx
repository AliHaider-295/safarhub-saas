"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function AddBookingModal({ open, setOpen }: Props) {
  const [form, setForm] = useState({
    passenger: "",
    route: "",
    bus: "",
    seats: 1,
    amount: "",
    payment: "Cash",
    status: "Confirmed",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg p-6 z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">
            Add Booking
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Passenger */}
          <div>
            <label className="block text-sm mb-1">Passenger Name</label>
            <input
              name="passenger"
              value={form.passenger}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Enter passenger name"
            />
          </div>

          {/* Route */}
          <div>
            <label className="block text-sm mb-1">Route</label>
            <select
              name="route"
              value={form.route}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Route</option>
              <option>Lahore → Islamabad</option>
              <option>Karachi → Lahore</option>
              <option>Peshawar → Lahore</option>
            </select>
          </div>

          {/* Bus */}
          <div>
            <label className="block text-sm mb-1">Bus</label>
            <select
              name="bus"
              value={form.bus}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Bus</option>
              <option>PK-777</option>
              <option>LA-202</option>
              <option>ND-303</option>
            </select>
          </div>

          {/* Seats + Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Seats</label>
              <input
                type="number"
                name="seats"
                min={1}
                value={form.seats}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Payment + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Payment Method</label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option>Cash</option>
                <option>Card</option>
                <option>Online</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-gray-300 px-4 py-2 rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Save Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}