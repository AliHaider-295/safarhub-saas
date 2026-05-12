"use client";

import { useState } from "react";
import BookingCards from "@/components/bookings/BookingCards";
import BookingFilters from "@/components/bookings/BookingFilters";
import BookingOverviewChart from "@/components/bookings/BookingOverviewChart";
import RevenueOverviewChart from "@/components/bookings/RevenueOverviewChart";
import AddBookingModal from "@/components/bookings/AddBookingModal";
import BookingTable from "@/components/bookings/BookingTable";

export default function BookingsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Title + Description */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Bookings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage customer bookings, track reservations, monitor revenue,
            and control booking activity from one place.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setOpen(true)}
          className="
            inline-flex items-center
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium
            px-5 py-2.5
            rounded-lg
            shadow-sm
            transition
          "
        >
          + Add Booking
        </button>
      </div>

      {/* Modal */}
      <AddBookingModal open={open} setOpen={setOpen} />

      {/* ================= CARDS ================= */}
      <div>
        <BookingCards />
      </div>

      {/* ================= FILTERS ================= */}
      <div>
        <BookingFilters />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BookingOverviewChart />
        <RevenueOverviewChart />
      </div>

      {/* ================= TABLE ================= */}
      <div>
        <BookingTable />
      </div>

    </div>
  );
}