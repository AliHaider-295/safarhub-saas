"use client";

import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

const bookings = [
  {
    id: "BK-2026-1250",
    date: "May 14, 2026 10:30 AM",
    passenger: "Ahmad Khan",
    route: "Kpk → Punjab",
    bus: "PK-777",
    seats: 2,
    amount: "Rs 3,000",
    status: "Confirmed",
    payment: "Cash",
  },
  {
    id: "BK-2026-1249",
    date: "May 14, 2026 09:15 AM",
    passenger: "Bilal Ahmed",
    route: "Lahore → Islamabad",
    bus: "LA-202",
    seats: 1,
    amount: "Rs 2,200",
    status: "Pending",
    payment: "Card",
  },
  {
    id: "BK-2026-1248",
    date: "May 14, 2026 08:45 AM",
    passenger: "Sameer Ali",
    route: "Karachi → Lahore",
    bus: "ND-303",
    seats: 3,
    amount: "Rs 4,500",
    status: "Confirmed",
    payment: "Cash",
  },
  {
    id: "BK-2026-1247",
    date: "May 13, 2026 07:30 PM",
    passenger: "Usman Tariq",
    route: "Multan → Islamabad",
    bus: "MU-111",
    seats: 1,
    amount: "Rs 2,000",
    status: "Cancelled",
    payment: "Card",
  },
  {
    id: "BK-2026-1246",
    date: "May 13, 2026 06:20 PM",
    passenger: "Hamza Raza",
    route: "Peshawar → Lahore",
    bus: "PK-555",
    seats: 2,
    amount: "Rs 3,400",
    status: "Confirmed",
    payment: "Cash",
  },
  {
    id: "BK-2026-1245",
    date: "May 13, 2026 05:10 PM",
    passenger: "Faisal Khan",
    route: "Kpk → Punjab",
    bus: "PK-777",
    seats: 1,
    amount: "Rs 1,500",
    status: "Pending",
    payment: "Card",
  },
];

export default function BookingTable() {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 overflow-hidden">
      
      {/* HEADER */}
      <div className="mb-5">
        <h3 className="text-[20px] font-semibold text-gray-900">
          Recent Bookings
        </h3>
      </div>

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
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition"
              >

                <td className="py-4 text-[14px] font-semibold text-blue-600 whitespace-nowrap">
                  {booking.id}
                </td>

                <td className="py-4 text-[14px] text-gray-600 whitespace-nowrap">
                  {booking.date}
                </td>

                <td className="py-4 text-[14px] font-medium text-gray-700 whitespace-nowrap">
                  {booking.passenger}
                </td>

                <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap">
                  {booking.route}
                </td>

                <td className="py-4 text-[14px] font-medium text-gray-700 whitespace-nowrap">
                  {booking.bus}
                </td>

                <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap">
                  {booking.seats}
                </td>

                <td className="py-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                  {booking.amount}
                </td>

                <td className="py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-lg text-[12px] font-medium ${getStatusStyles(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap">
                  {booking.payment}
                </td>

                <td className="py-4">
                  <div className="flex items-center justify-center">
                    <button className="w-10 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
                      <Eye size={16} className="text-blue-600" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">

        <p className="text-[14px] text-gray-500">
          Showing 1 to 6 of 1,248 bookings
        </p>

        {/* PAGINATION */}
        <div className="flex items-center gap-2">

          <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
            <ChevronLeft size={16} className="text-gray-500" />
          </button>

          <button className="w-9 h-9 rounded-lg bg-[#0f172a] text-white text-sm font-medium">
            1
          </button>

          <button className="w-9 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            2
          </button>

          <button className="w-9 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            3
          </button>

          <button className="w-9 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            ...
          </button>

          <button className="w-12 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
            125
          </button>

          <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
            <ChevronRight size={16} className="text-gray-500" />
          </button>

        </div>
      </div>
    </div>
  );
}