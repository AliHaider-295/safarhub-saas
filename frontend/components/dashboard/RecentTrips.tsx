"use client";
import { authFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Bus, MapPin } from "lucide-react";

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
    const fetchTrips = async () => {
      try {
        const res = await authFetch("/dashboard/recent-trips");
  
        if (!res.ok) {
          throw new Error("Failed to fetch trips");
        }
  
        const data = await res.json();
  
        console.log("TRIPS:", data);
  
        // ✅ SAFETY FIX (unchanged logic)
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          setTrips([]);
        }
  
      } catch (err) {
        console.error("Trips fetch error:", err);
        setTrips([]);
      }
    };
  
    fetchTrips();
  }, []);
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Recent Trips</h2>
        <span className="text-xs text-gray-400">
          Last {trips.length} trips
        </span>
      </div>

      {/* Empty State */}
      {trips.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No trips available
        </div>
      ) : (
        <div className="space-y-3">

          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between p-3 rounded-xl border hover:bg-gray-50 transition"
            >

              {/* Left: Bus + Route */}
              <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Bus size={16} className="text-blue-600" />
                </div>

                <div>
                  {/* Bus */}
                  <p className="text-sm font-medium text-gray-800">
                    {trip.bus}
                  </p>

                  {/* Route */}
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} />
                    {trip.route}
                  </p>
                </div>
              </div>

              {/* Right: Income + Date */}
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">
                  ${trip.income}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(trip.date)}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}