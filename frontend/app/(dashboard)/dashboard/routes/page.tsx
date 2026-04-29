"use client";

import { useEffect, useState } from "react";

import RoutesCard from "@/components/routes/RoutesCard";
import RoutesTable from "@/components/routes/RoutesTable";
import RouteChart from "@/components/routes/RouteChart";
import DistanceChart from "@/components/routes/DistanceChart";
import AddRouteModal from "@/components/routes/AddRouteModal";

import {
  Map,
  Route,
  Sunrise,
  Sunset,
  BarChart3,
  Star,
} from "lucide-react";

export default function RoutesPage() {
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  // ✅ Fetch routes (shared for cards + table)
  const fetchRoutes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/routes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setRoutes(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Fetch routes error:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [refresh]);

  // ✅ Derived stats (SaaS logic)
  const total = routes.length;
  const active = routes.filter((r) => r.status === "ACTIVE").length;

  const totalDistance = routes.reduce(
    (sum, r) => sum + (r.distance || 0),
    0
  );

  const popularRoute =
    routes.length > 0
      ? `${routes[0].from} → ${routes[0].to}`
      : "-";

  return (
    <main className="p-4 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Routes</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Route
        </button>
      </div>

      {/* Cards (NOW DYNAMIC) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

        <RoutesCard
          title="Total Routes"
          value={total}
          description="All routes"
          icon={<Map />}
        />

        <RoutesCard
          title="Active"
          value={active}
          description="Running"
          icon={<Route />}
          color="green"
        />

        <RoutesCard
          title="Distance"
          value={`${totalDistance} km`}
          description="Total"
          icon={<BarChart3 />}
          color="blue"
        />

        <RoutesCard
          title="Popular"
          value={popularRoute}
          description="Top route"
          icon={<Star />}
          color="red"
        />

        {/* Optional placeholders */}
        <RoutesCard
          title="Morning"
          value="-"
          description="Coming soon"
          icon={<Sunrise />}
          color="yellow"
        />

        <RoutesCard
          title="Evening"
          value="-"
          description="Coming soon"
          icon={<Sunset />}
          color="purple"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RouteChart />
        <DistanceChart />
      </div>

      {/* Table */}
      <RoutesTable refresh={refresh} />

      {/* Modal */}
      <AddRouteModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setRefresh((prev) => !prev)} // 🔥 KEY
      />

    </main>
  );
}