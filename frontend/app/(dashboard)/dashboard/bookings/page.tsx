"use client";

import { useState } from "react";
import BookingCards from "@/components/bookings/BookingCards";
import BookingFilters from "@/components/bookings/BookingFilters";
import BookingOverviewChart from "@/components/bookings/BookingOverviewChart";
import RevenueOverviewChart from "@/components/bookings/RevenueOverviewChart";
import AddBookingModal from "@/components/bookings/AddBookingModal";

export default function BookingsPage() {
    const [open, setOpen] = useState(false);
  return (
    <div>
    
      <div>
        <button onClick={() => setOpen(true)}>
          Open Modal
        </button>
  
        <AddBookingModal
          open={open}
          setOpen={setOpen}
        />
          <BookingCards />
      <BookingFilters />
      <BookingOverviewChart />
      <RevenueOverviewChart />
      </div>
    </div>
  );
}