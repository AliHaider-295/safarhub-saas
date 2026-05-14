"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// 🚀 Disable SSR for heavy UI parts (fix hydration mismatch)
const BookingCards = dynamic(
  () => import("@/components/bookings/BookingCards"),
  { ssr: false }
);

const BookingFilters = dynamic(
  () => import("@/components/bookings/BookingFilters"),
  { ssr: false }
);

const BookingOverviewChart = dynamic(
  () => import("@/components/bookings/BookingOverviewChart"),
  { ssr: false }
);

const RevenueOverviewChart = dynamic(
  () => import("@/components/bookings/RevenueOverviewChart"),
  { ssr: false }
);

const AddBookingModal = dynamic(
  () => import("@/components/bookings/AddBookingModal"),
  { ssr: false }
);

const BookingTable = dynamic(
  () => import("@/components/bookings/BookingTable"),
  { ssr: false }
);

export default function BookingsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Bookings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage customer bookings, track reservations, monitor revenue,
            and control booking activity from one place.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition">
          + Add Booking
        </button>
      </div>

      {/* ================= MODAL ================= */}
      <AddBookingModal open={open} setOpen={setOpen} />

      {/* ================= CARDS ================= */}
      <BookingCards />

      {/* ================= FILTERS ================= */}
      <BookingFilters />

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BookingOverviewChart />
        <RevenueOverviewChart />
      </div>

      {/* ================= TABLE ================= */}
      <BookingTable />

    </div>
  );
}