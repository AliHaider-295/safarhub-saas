"use client";

import { useEffect, useState } from "react";

type Trip = {
  id: string;
  bus: string;
  route: string;
  income: number;
  date: string;
};

export default function RecentTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/recent-trips")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  // ✅ Format date nicely
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <h2 className="mb-3 text-sm sm:text-base font-semibold">
        Recent Trips
      </h2>

      {/* ✅ Scroll wrapper (IMPORTANT) */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Bus</th>
              <th className="text-left py-2">Route</th>
              <th className="text-left py-2">Income</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b">
                <td className="py-2 whitespace-nowrap">
                  {trip.bus}
                </td>

                <td className="whitespace-nowrap">
                  {trip.route}
                </td>

                <td className="text-green-600 font-medium whitespace-nowrap">
                  ${trip.income}
                </td>

                {/* ✅ FIXED DATE */}
                <td className="whitespace-nowrap text-gray-600">
                  {formatDate(trip.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}