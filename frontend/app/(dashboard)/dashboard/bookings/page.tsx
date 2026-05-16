"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { authFetch } from "@/lib/api";
import toast from "react-hot-toast";
import type { BookingStats } from "@/components/bookings/BookingCards";
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
  const initialFilters = {
    fromDate: "",
    toDate: "",
    status: "",
    routeId: "",
    busId: "",
  };
  
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [dashboardData, setDashboardData] =
  useState<BookingStats | null>(null);
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [stats, setStats] = useState(null);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
 
const applyFilters = () => {
  setPage(1);
  setAppliedFilters(filters);
};

const fetchBookings = async () => {
  try {
    setBookingsLoading(true);

    const query = new URLSearchParams({
     
      ...appliedFilters,
    }).toString();

    const response = await authFetch(`/bookings?${query}`);

    const result = await response.json();

    if (result.success) {
      setBookings(result.data || []);

      setPagination({
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.totalPages || 1,
        hasNextPage: result.pagination?.hasNextPage || false,
        hasPrevPage: result.pagination?.hasPrevPage || false,
      });
    }
  } catch (error) {
    console.error("Fetch Booking Error:", error);
  } finally {
    setBookingsLoading(false);
  }
};

const fetchDashboard = async () => {
  try {
    setLoading(true);

    const cleanFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(
        ([_, value]) => value !== ""
      )
    );

    const query = new URLSearchParams({
     
      ...cleanFilters,
    }).toString();

    const response = await authFetch(
      `/bookings/summary?${query}`
    );

    const result = await response.json();

    console.log(result, "SUMMARY API RESPONSE");

    if (result.success) {
      setDashboardData(result.data);
    }
  } catch (error) {
    console.error("Fetch Dashboard Error:", error);
  } finally {
    setLoading(false);
  }
};
const fetchSummary = async () => {
  try {
    const response = await authFetch("/bookings/summary");

    const result = await response.json();

    console.log("SUMMARY API RESPONSE:", result);

    if (result.success) {
      setStats({
        totalBookings: result.totalBookings,
        confirmed: result.confirmedBookings,
        pending: result.pendingBookings,
        cancelled: result.cancelledBookings,
        revenue: result.totalRevenue ?? 0,
      });
    }
  } catch (error) {
    console.error("Fetch Summary Error:", error);
  }
};
  const fetchRoutes = async () => {
    try {
      const response = await authFetch("/routes");
      const result = await response.json();
  
      if (result.success) {
        setRoutes(result.data || []);
      }
    } catch (error) {
      console.error("Fetch Routes Error:", error);
    }
  };
  const fetchBuses = async () => {
    try {
      const response = await authFetch("/buses");
      const result = await response.json();
  
      if (result.success) {
        setBuses(result.data || []);
      }
    } catch (error) {
      console.error("Fetch Buses Error:", error);
    }
  };
  useEffect(() => {
    Promise.all([fetchRoutes(), fetchBuses()]);
  }, []);
  
  useEffect(() => {
    fetchBookings();
    fetchSummary();
  }, [page, appliedFilters]);
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
      <AddBookingModal open={open}setOpen={setOpen}fetchBookings={fetchBookings}/>

      {/* ================= CARDS ================= */}
      <BookingCards stats={stats} />



      {/* ================= FILTERS ================= */}
      <BookingFilters
  filters={filters}
  setFilters={setFilters}
  onApplyFilters={applyFilters}
  routes={routes}
  buses={buses}
/>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <BookingOverviewChart
  data={dashboardData?.bookingChart}
/>

<RevenueOverviewChart
  data={dashboardData?.revenueChart}
/>
      </div>

      {/* ================= TABLE ================= */}
      <BookingTable
  bookings={bookings}
  loading={loading}
  pagination={pagination}
  page={page}
  setPage={setPage}
/>

    </div>
  );
}