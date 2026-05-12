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
    payment: "Cash",
    status: "Confirmed",
    amount: "",
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

    console.log("Booking Data:", form);

    // later -> API call
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
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Add New Booking</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Passenger */}
          <div>
            <label className="label">Passenger Name</label>
            <input
              name="passenger"
              value={form.passenger}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter passenger name"
            />
          </div>

          {/* Route + Bus */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Route</label>
              <select
                name="route"
                value={form.route}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Route</option>
                <option>Lahore → Islamabad</option>
                <option>Karachi → Lahore</option>
                <option>Peshawar → Lahore</option>
              </select>
            </div>

            <div>
              <label className="label">Bus</label>
              <select
                name="bus"
                value={form.bus}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Bus</option>
                <option>PK-777</option>
                <option>LA-202</option>
                <option>ND-303</option>
              </select>
            </div>
          </div>

          {/* Seats + Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Seats</label>
              <input
                type="number"
                name="seats"
                min={1}
                value={form.seats}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="label">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="input"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Payment + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Payment Method</label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="input"
              >
                <option>Cash</option>
                <option>Card</option>
                <option>Online</option>
              </select>
            </div>

            <div>
              <label className="label">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input"
              >
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}