"use client";

import {
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
} from "react";

import { authFetch } from "@/lib/api";

interface Booking {
  id: string;
  bookingCode: string;
  passengerName: string;
  seats: number;
  amount: number;
  status: string;
  paymentMethod: string;
  journeyDate: string;

  bus?: {
    busNumber?: string;
    name?: string;
  };

  route?: {
    from?: string;
    to?: string;
    origin?: string;
    destination?: string;
    routeName?: string;
  };
}
interface Props {
  bookings: Booking[];
  loading: boolean;
  pagination: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  page: number;
  setPage: React.Dispatch<
    React.SetStateAction<number>
  >;
}
export default function BookingTable({
  bookings,
  loading,
  pagination,
  page,
  setPage,
}: Props) {


 
  // =====================================
  // FETCH BOOKINGS
  // =====================================


  // =====================================
  // INITIAL FETCH
  // =====================================

  // =====================================
  // STATUS STYLES
  // =====================================
  const getStatusStyles = (
    status: string
  ) => {

    switch (
      status?.toUpperCase()
    ) {

      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // =====================================
  // FORMAT DATE
  // =====================================
  const formatDate = (date: string) => {
    if (!date) return "-";
  
    const bookingDate = new Date(date);
  
    return bookingDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================
  // FORMAT ROUTE
  // =====================================
  const formatRoute = (
    route: any
  ) => {

    if (!route) return "-";

    if (
      route.from &&
      route.to
    ) {
      return `${route.from} → ${route.to}`;
    }

    if (
      route.origin &&
      route.destination
    ) {
      return `${route.origin} → ${route.destination}`;
    }

    return (
      route.routeName || "-"
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 overflow-hidden">

      {/* HEADER */}
      <div className="mb-5">

        <h3 className="text-[20px] font-semibold text-gray-900">
          Recent Bookings
        </h3>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="py-20 flex items-center justify-center">

          <p className="text-[14px] text-gray-500">
            Loading bookings...
          </p>

        </div>

      ) : (

        <>
          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead>
                <tr className="border-b border-gray-100">

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Booking ID
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Date
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Passenger
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Route
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Bus
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Seats
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Amount
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Status
                  </th>

                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Payment
                  </th>

                  <th className="text-center text-[12px] font-semibold text-gray-500 uppercase pb-4 whitespace-nowrap">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {bookings.length > 0 ? (

                  bookings.map(
                    (booking) => (

                      <tr
                        key={booking.id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition">

                        {/* BOOKING CODE */}
                        <td className="py-4 text-[14px] font-semibold text-blue-600 whitespace-nowrap">

                          {booking.bookingCode}

                        </td>

                        {/* DATE */}
                        <td className="py-4 text-[14px] text-gray-600 whitespace-nowrap">

                        {booking.journeyDate
                        ? formatDate(booking.journeyDate)
                         : "-"}

                        </td>

                        {/* PASSENGER */}
                        <td className="py-4 text-[14px] font-medium text-gray-700 whitespace-nowrap">

                          {booking.passengerName}

                        </td>

                        {/* ROUTE */}
                        <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap">

                          {formatRoute(
                            booking.route
                          )}

                        </td>

                        {/* BUS */}
                        <td className="py-4 text-[14px] font-medium text-gray-700 whitespace-nowrap">

                          {booking.bus
                            ?.busNumber ||

                            booking.bus
                              ?.name ||

                            "-"}

                        </td>

                        {/* SEATS */}
                        <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap">

                          {booking.seats}

                        </td>

                        {/* AMOUNT */}
                        <td className="py-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">

                          
                          Rs{" "}
                          {Number(
                         booking.amount || 0
                        ).toLocaleString()}

                        </td>

                        {/* STATUS */}
                        <td className="py-4 whitespace-nowrap">

                          <span
                            className={`px-3 py-1 rounded-lg text-[12px] font-medium ${getStatusStyles(
                              booking.status
                            )}`}
                          > 

                            {booking.status}

                          </span>

                        </td>

                        {/* PAYMENT */}
                        <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap">

                          {booking.paymentMethod}

                        </td>

                        {/* ACTION */}
                        <td className="py-4">

                          <div className="flex items-center justify-center">

                            <button className="w-10 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">

                              <Eye
                                size={16}
                                className="text-blue-600"/>

                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={10}
                      className="py-16 text-center text-[14px] text-gray-500">

                      No bookings found

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}
        {/* PAGINATION */}
<div className="flex items-center justify-between mt-6">

  <p className="text-[14px] text-gray-500">
    Showing page {page} of {pagination.totalPages} (
    {pagination.total} total bookings)
  </p>

  <div className="flex items-center gap-2">

    {/* PREVIOUS */}
    <button
      disabled={!pagination.hasPrevPage}
      onClick={() => setPage((prev) => prev - 1)}
      className="h-9 w-9 border rounded-md flex items-center justify-center disabled:opacity-40"
    >
      <ChevronLeft size={16} />
    </button>

    {/* CURRENT PAGE */}
    {Array.from(
  { length: pagination.totalPages },
  (_, index) => {

    const pageNumber = index + 1;

    return (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={`h-9 min-w-[36px] px-3 rounded-md text-sm font-medium border transition ${
          page === pageNumber
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        }`}
      >
        {pageNumber}
      </button>
    );
  }
)}

    {/* NEXT */}
    <button
      disabled={!pagination.hasNextPage}
      onClick={() => setPage((prev) => prev + 1)}
      className="h-9 w-9 border rounded-md flex items-center justify-center disabled:opacity-40"
    >
      <ChevronRight size={16} />
    </button>

  </div>
</div>
        </>
      )}
    </div>
  );
}