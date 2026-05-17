"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { authFetch } from "@/lib/api";
import toast from "react-hot-toast";
// 🚀 Disable SSR for heavy UI parts (fix hydration mismatch)
const BookingCards = dynamic(
  () => import("@/components/bookings/BookingCards"),
  { ssr: false }
);

import BookingFilters from "@/components/bookings/BookingFilters";

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
  const [dashboardData, setDashboardData] = useState<BookingStats | null>(null);
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
 
  const applyFilters = (
    updatedFilters
  ) => {
  
    setPage(1);
  
    setAppliedFilters(
      updatedFilters
    );
  };

  const buildQuery = () => {
    const params = new URLSearchParams();

    if (filters.busId) params.append("busId", filters.busId);
    if (filters.routeId) params.append("routeId", filters.routeId);
    if (filters.status) params.append("status", filters.status);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
  }

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
  
      const cleanFilters = Object.fromEntries(
        Object.entries(appliedFilters).filter(
          ([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
        )
      );
  
      const query = new URLSearchParams({
        page: String(page),
        limit: "10",
        ...cleanFilters,
      } as Record<string, string>).toString();
  
      console.log("BOOKING QUERY:", query);
  
      const response = await authFetch(
        `/bookings?${query}`
      );
  
      const result = await response.json();
  
      if (result.success) {
        setBookings(result.data || []);
  
        setPagination({
          total:
            result.pagination?.total || 0,
  
          totalPages:
            result.pagination
              ?.totalPages || 1,
  
          hasNextPage:
            result.pagination
              ?.hasNextPage || false,
  
          hasPrevPage:
            result.pagination
              ?.hasPrevPage || false,
        });
      }
    } catch (error) {
      console.error(
        "Fetch Booking Error:",
        error
      );
    } finally {
      setBookingsLoading(false);
    }
  };


  const fetchDashboard = async () => {
    try {
      setLoading(true);
  
      const cleanFilters = Object.fromEntries(
        Object.entries(appliedFilters).filter(
          ([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
        )
      );
  
      const query = new URLSearchParams(
        cleanFilters as Record<
          string,
          string
        >
      ).toString();
  
      console.log(
        "DASHBOARD QUERY:",
        query
      );
  
      const response = await authFetch(
        `/bookings/summary?${query}`
      );
  
      const result = await response.json();
  
      if (result.success) {
        setDashboardData({
          totalBookings:
            result.totalBookings,
  
          confirmed:
            result.confirmedBookings,
  
          pending:
            result.pendingBookings,
  
          cancelled:
            result.cancelledBookings,
  
          revenue:
            result.totalRevenue ?? 0,
  
          bookingChart:
            result.bookingChart || [],
  
          revenueChart:
            result.revenueChart || [],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await authFetch("/routes");
  
      const data = await response.json(); // ⭐ REQUIRED
  
      console.log("ROUTES API:", data);
  
      setRoutes(
        data.map((route: any) => ({
          id: route._id || route.id,
          from: route.from,
          to: route.to,
        }))
      );
    } catch (error) {
      console.error("Routes error:", error);
    }
  };


 
  const fetchBuses = async () => {
    try {
      const response = await authFetch("/buses");
  
      const data = await response.json(); // ⭐ REQUIRED
  
      console.log("BUSES API:", data);
  
      setBuses(
        data.map((bus: any) => ({
          id: bus._id || bus.id,
          busNumber: bus.busNumber || bus.number,
        }))
      );
    } catch (error) {
      console.error("Buses error:", error);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };


  const handleBookingCreated = () => {
    fetchBookings();
    fetchDashboard();  
    // ⭐ ONLY THIS
  };
  console.log(appliedFilters);

 
  const handleExport = async () => {
    try {
      // ✅ build query from filters
      const params = new URLSearchParams();
  
      if (filters.status)
        params.append("status", filters.status);
  
      if (filters.routeId)
        params.append("routeId", filters.routeId);
  
      if (filters.busId)
        params.append("busId", filters.busId);
  
      if (filters.fromDate)
        params.append("fromDate", filters.fromDate);
  
      if (filters.toDate)
        params.append("toDate", filters.toDate);
  
      const url = `/bookings/export?${params.toString()}`;
  
      console.log("EXPORT URL:", url);
  
      const response = await authFetch(url);
      const result = await response.json();
  
      const bookings = result.data || [];
  
      if (!bookings.length) {
        alert("No data to export");
        return;
      }
  
      // ✅ Convert to CSV
      const headers = [
        "Booking ID",
        "Passenger",
        "Status",
        "Route",
        "Bus",
        "Date",
      ];
  
      const rows = bookings.map((b: any) => [
        b.id,
        b.passengerName,
        b.status,
        `${b.route?.from} → ${b.route?.to}`,
        b.bus?.busNumber,
        new Date(b.createdAt).toLocaleDateString(),
      ]);
  
      const csvContent =
        [headers, ...rows]
          .map((row) => row.join(","))
          .join("\n");
  
      // ✅ Create downloadable file
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
  
      const link = document.createElement("a");
  
      link.href = URL.createObjectURL(blob);
      link.download = `bookings-${Date.now()}.csv`;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
    } catch (error) {
      console.error("Export error:", error);
    }
  };
  
  useEffect(() => {
    console.log("🚀 LOADING ROUTES & BUSES");
    fetchRoutes();
    fetchBuses();
  }, []);
  
  useEffect(() => {
    fetchBookings();
    fetchDashboard();
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
      <AddBookingModal open={open}setOpen={setOpen}onSuccess={handleBookingCreated}/>

      {/* ================= CARDS ================= */}
      <BookingCards stats={dashboardData} />



      {/* ================= FILTERS ================= */}
      <BookingFilters
  filters={filters}
  setFilters={setFilters}
  onApplyFilters={applyFilters}
  routes={routes}
  buses={buses}
  onExport={handleExport}
/>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <BookingOverviewChart
 data={dashboardData?.bookingChart || []}
/>

<RevenueOverviewChart
  data={dashboardData?.revenueChart}
/>
      </div>

      {/* ================= TABLE ================= */}
      <BookingTable
  bookings={bookings}
 loading={bookingsLoading}
  pagination={pagination}
  page={page}
  setPage={setPage}
/>

    </div>
  );
}