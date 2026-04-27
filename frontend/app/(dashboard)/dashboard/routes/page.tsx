"use client";

import { useState } from "react";

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

  return (
    <main className="p-4 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Routes</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Route
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <RoutesCard title="Total Routes" value="20" description="All routes" icon={<Map />} />
        <RoutesCard title="Active" value="15" description="Running" icon={<Route />} color="green" />
        <RoutesCard title="Morning" value="8" description="Before 12PM" icon={<Sunrise />} color="yellow" />
        <RoutesCard title="Evening" value="12" description="After 12PM" icon={<Sunset />} color="purple" />
        <RoutesCard title="Distance" value="5400km" description="Total" icon={<BarChart3 />} color="blue" />
        <RoutesCard title="Popular" value="KHI → LHR" description="Top route" icon={<Star />} color="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RouteChart />
        <DistanceChart />
      </div>

      {/* Table */}
      <RoutesTable />

      {/* Modal */}
      <AddRouteModal open={open} onClose={() => setOpen(false)} />

    </main>
  );
}