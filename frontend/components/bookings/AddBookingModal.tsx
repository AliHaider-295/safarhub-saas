"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { authFetch } from "@/lib/api";

import { toast } from "sonner";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

export default function AddBookingModal({
  open,
  setOpen,
  onSuccess,
}: Props) {

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    passengerName: "",
    routeId: "",
    busId: "",
    seats: 1,
    amount: "",
    paymentMethod: "Cash",
    status: "CONFIRMED",
    journeyDate: "",
  });

  useEffect(() => {

    const token =
      localStorage.getItem(
        "safarhub_token"
      );

    if (!token || !open) return;

    const fetchData = async () => {

      try {

        const busRes =
          await authFetch("/buses");

        const routeRes =
          await authFetch("/routes");

        const busData =
          await busRes.json();

        const routeData =
          await routeRes.json();

        console.log(
          "BUS DATA:",
          busData
        );

        console.log(
          "ROUTE DATA:",
          routeData
        );

        // FIXED HERE
        setBuses(
          Array.isArray(busData)
            ? busData
            : []
        );

        setRoutes(
          Array.isArray(routeData)
            ? routeData
            : []
        );

      } catch (err) {

        console.error(
          "Failed to load buses/routes",
          err
        );
      }
    };

    fetchData();

  }, [open]);

  // IMPORTANT FIX
  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!form.busId || !form.routeId) {
      toast.error("Please select bus and route");
      return;
    }
  
    try {

      const response = await authFetch("/bookings", {
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
          seats: Number(form.seats),
        }),
      });
    
      const result = await response.json();
    
      console.log(
        "BOOKING RESPONSE:",
        result
      );
    
      // ✅ SUCCESS
      if (response.ok && result.success) {

        onSuccess?.();
      
        setOpen(false);
      
        toast.success(
          "Booking created successfully"
        );
      
      } else {
      
        toast.error(
          result.message ||
          "Failed to create booking"
        );
      }
    
    } catch (error) {
    
      console.error(error);
    
      toast.error(
        "Server error while creating booking"
      );
    }
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
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Passenger */}
          <div>
            <label className="block text-sm mb-1">
              Passenger Name
            </label>

            <input
              name="passengerName"
              value={form.passengerName}
              onChange={handleChange}
              required
              placeholder="Enter passenger name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Route */}
          <div>

            <label className="block text-sm mb-1">
              Route
            </label>

            <select
              name="routeId"
              value={form.routeId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >

              <option value="">
                Select Route
              </option>

              {routes.map((route: any) => (

                <option
                  key={route.id}
                  value={route.id}
                >
                  {route.from} → {route.to}
                </option>
              ))}
            </select>
          </div>

          {/* Bus */}
          <div>

            <label className="block text-sm mb-1">
              Bus
            </label>

            <select
              name="busId"
              value={form.busId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >

              <option value="">
                Select Bus
              </option>

              {buses.map((bus: any) => (

                <option
                  key={bus.id}
                  value={bus.id}
                >
                  {bus.busNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Journey Date */}
<div>
  <label className="block text-sm mb-1">
    Journey Date
  </label>

  <input
    type="date"
    name="journeyDate"
    value={form.journeyDate}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
  />
</div>

{/* Seats + Amount */}
<div className="grid grid-cols-2 gap-4">

  <div>
    <label className="block text-sm mb-1">
      Seats
    </label>

    <input
      type="number"
      name="seats"
      min={1}
      value={form.seats}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>

  <div>
    <label className="block text-sm mb-1">
      Amount
    </label>

    <input
      type="number"
      name="amount"
      value={form.amount}
      onChange={handleChange}
      required
      placeholder="Enter amount"
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>

</div>

{/* Payment + Status */}
<div className="grid grid-cols-2 gap-4">

  <div>
    <label className="block text-sm mb-1">
      Payment Method
    </label>

    <select
      name="paymentMethod"
      value={form.paymentMethod}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    >

      <option value="Cash">
        Cash
      </option>

      <option value="Card">
        Card
      </option>

      <option value="Online">
        Online
      </option>

    </select>
  </div>

  <div>
    <label className="block text-sm mb-1">
      Status
    </label>

    <select
      name="status"
      value={form.status}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    >

<option value="">All Status</option>
<option value="CONFIRMED">Confirmed</option>
<option value="PENDING">Pending</option>
<option value="CANCELLED">Cancelled</option>

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