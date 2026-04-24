"use client";

import { useEffect, useState } from "react";

export default function RecentTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/recent-trips")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <h2 className="mb-4 font-semibold">Recent Trips</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Bus</th>
            <th className="text-left py-2">Route</th>
            <th className="text-left py-2">Income</th>
            <th className="text-left py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip: any) => (
            <tr key={trip.id} className="border-b">
              <td className="py-2">{trip.bus}</td>
              <td>{trip.route}</td>
              <td className="text-green-600 font-medium">
                ${trip.income}
              </td>
              <td>{trip.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}